import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Gig, GigStatus } from './gig.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository, SelectQueryBuilder } from 'typeorm';
import { GigDTO } from './DTO/gig.dto';
import { Category } from '../category/category.entity';
import { Service } from '../service/service.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { User } from '../user/user.entity';
import { Metadata } from '../metadata/metadata.entity';
import { MetadataTag } from '../metadata-tag/metadata-tag.entity';
import { Tag } from '../tag/tag.entity';
import { FAQ } from '../faq/faq.entity';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { SaveGigWithPackagesDTO } from './DTO/save-gig-with-packages.dto';
import { PackageService } from '../package/package.service';

@Injectable()
export class GigService {
  constructor(
    @InjectRepository(Gig)
    private gigRepository: Repository<Gig>,
    @Inject(forwardRef(() => PackageService))
    private packageService: PackageService,
    private subcategoryService: SubcategoryService,
  ) {}

  async updateGigAbout(gigId: string, aboutGig: object): Promise<Gig> {
    const gig = await this.findOneById(gigId);
    if (!gig) {
      throw new HttpException('Gig not found', 404);
    }
    gig.aboutGig = aboutGig;
    return this.gigRepository.save(gig);
  }

  async updateFiles(
    files: {
      imageUrls: string[];
      pdfUrls: string[];
      videoUrl: {
        videoUrl: string;
        thumbnail: string;
      };
    },
    gigId: string,
  ): Promise<Gig> {
    const gig = await this.findOneById(gigId);
    if (!gig) {
      throw new HttpException('Gig not found', 404);
    }
    gig.imageUrls = files.imageUrls;
    gig.pdfUrls = files.pdfUrls;
    gig.videoUrl = files.videoUrl;
    if (gig.step < 6) {
      gig.step = 6;
    }
    return this.gigRepository.save(gig);
  }

  async makeGigPublic(gigId: string): Promise<Gig> {
    const gig = await this.findOneById(gigId);
    if (!gig) {
      throw new HttpException('Gig not found', 404);
    }
    gig.isPublished = true;
    gig.step = 7;
    return this.gigRepository.save(gig);
  }

  async getAllGigsByUserId(userId: string, status: GigStatus): Promise<Gig[]> {
    return this.gigRepository.find({
      where: {
        user: { id: userId },
        status: status ? status : GigStatus.ACTIVE,
      },
      select: [
        'id',
        'title',
        'status',
        'imageUrls',
        'clicks',
        'impressions',
        'cancellations',
        'orders',
      ],
    });
  }

  async findRandomGigs(limit: number): Promise<Gig[]> {
    return this.gigRepository
      .createQueryBuilder('gig')
      .distinctOn(['gig.id'])
      .leftJoinAndSelect('gig.category', 'category')
      .orderBy('gig.id')
      .addOrderBy('RANDOM()')
      .limit(limit)
      .getMany();
  }

  async findUserGigs(user: User, include: string, limit: number = 10) {
    const userLastVisitedGigs = user.lastVisitedGigs;
    const dominantCategory = userLastVisitedGigs.reduce(
      (acc, curr) => {
        if (acc[curr.category.name]) {
          acc[curr.category.name]++;
        } else {
          acc[curr.category.name] = 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
    const category = Object.keys(dominantCategory).reduce(
      (a, b) => (dominantCategory[a] > dominantCategory[b] ? a : b),
      'Web Development',
    );

    /// get all subcategories of that category
    const obj = {};
    const subcategories =
      await this.subcategoryService.findSubcategoriesByCategoryName(category);
    for (const subcategory of subcategories) {
      obj[subcategory.name] = [];
    }

    let queryBuilder = this.gigRepository.createQueryBuilder('gig');
    queryBuilder = queryBuilder
      .distinctOn(['gig.id'])
      .addOrderBy('gig.id')
      .limit(limit);
    queryBuilder = this.applyDynamicJoinsAndOrdering(queryBuilder, include);
    const gigs = await queryBuilder.getMany();
    console.log('AFTER findUserGigs');
    obj['explore'] = gigs;
    return obj;
  }

  async fetchUserLastVisitedGig(user: User, include: string) {
    const userLastVisitedGigs = user.lastVisitedGigs;
    let queryBuilder = this.gigRepository.createQueryBuilder('gig');
    queryBuilder = this.applyDynamicJoinsAndOrdering(queryBuilder, include);
    queryBuilder = queryBuilder.where('gig.id IN (:...ids)', {
      ids: userLastVisitedGigs.map((gig) => gig.gigId),
    });
    return await queryBuilder.getMany();
  }

  async findRandomGigsBySubcategoryName(
    subcategoryName: string,
    include: string,
    user: User,
    limit: number = 10,
  ): Promise<Gig[]> {
    if (subcategoryName === 'explore') {
      return await this.fetchUserLastVisitedGig(user, include);
    }
    let queryBuilder = this.gigRepository.createQueryBuilder('gig');
    queryBuilder = this.applyDynamicJoinsAndOrdering(queryBuilder, include);
    queryBuilder = queryBuilder
      .where('subcategory.name = :subcategoryName', {
        subcategoryName,
      })
      .distinctOn(['gig.id'])
      .orderBy('gig.id')
      .addOrderBy('RANDOM()')
      .limit(limit);

    return await queryBuilder.getMany();
  }

  async deleteGig(gigIds: string[]) {
    try {
      this.gigRepository.delete({
        id: In(gigIds),
      });
    } catch (err) {
      //handle error of json parse
      throw new HttpException(err.message, 404);
    }
    return HttpStatus.NOT_MODIFIED;
  }

  async pauseGig(gigId: string) {
    const gig = await this.findOneById(gigId);
    if (!gig) {
      throw new HttpException('Gig not found', 404);
    }
    gig.status = GigStatus.PAUSED;
    await this.gigRepository.save(gig);
    return HttpStatus.NOT_MODIFIED;
  }

  async saveGigWithPackages(
    gigId: string,
    gigDto: SaveGigWithPackagesDTO,
  ): Promise<Gig> {
    return await this.gigRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const { basic, standard, premium, ...gig } = gigDto;
        await this.saveGig(gigId, gig, transactionalEntityManager);
        const isEditMode =
          await this.packageService.findOneByPackageTypeAndGigId(
            'basic',
            gigId,
          );
        try {
          const createPackageWithFeatures = async () => {
            if (isEditMode) {
              await this.packageService.updatePackage(
                gigId,
                {
                  basic,
                  standard,
                  premium,
                },
                transactionalEntityManager,
              );
            } else {
              await this.packageService.createPackage(
                gigId,
                {
                  basic,
                  standard,
                  premium,
                },
                transactionalEntityManager,
              );
            }
          };

          await createPackageWithFeatures();

          return this.findOneById(gigId);
        } catch (error) {
          throw new Error('Transaction failed: ' + error.message);
        }
      },
    );
  }

  async saveGig(
    gigId: string,
    gigDto: GigDTO,
    transactionalEntityManager?: EntityManager,
  ): Promise<Gig> {
    try {
      const {
        title,
        metadata,
        tagIds,
        categoryId,
        serviceId,
        subcategoryId,
        userId,
        aboutGig,
        faqs,
      } = gigDto;
      let gig: Gig;
      if (!gigId) {
        gig = new Gig();
        gig.faqs = [];
      } else {
        gig = await this.findOneById(gigId);
      }
      const metadataIds = [] as Metadata[];
      const metadataTagIds = [] as MetadataTag[];
      for (const metadataId in metadata) {
        metadataIds.push({ id: +metadataId } as Metadata);
        if (typeof metadata[metadataId] == 'number') {
          metadataTagIds.push({ id: metadata[metadataId] } as MetadataTag);
        } else {
          const ids = metadata[metadataId].map((id) => {
            const meta = { id } as MetadataTag;
            return meta;
          });
          metadataTagIds.push(...ids);
        }
      }
      gig.title = title;
      gig.category = { id: categoryId } as Category;
      gig.service = { id: serviceId } as Service;
      const existingCategory =
        await this.subcategoryService.findOneById(subcategoryId);
      if (gig.subcategory && gig.subcategory.name !== existingCategory.name) {
        gig.packages = [];
      }
      gig.subcategory = { id: subcategoryId } as Subcategory;
      gig.user = { id: String(userId) } as User;
      gig.metadata = metadataIds;
      gig.metadataTags = metadataTagIds;
      gig.tags = tagIds.map((id) => ({ id })) as Tag[];
      if (faqs?.length && aboutGig && gig.step >= 3) {
        for (const faq of gig.faqs) {
          if (!faqs.find((f) => f.id === faq.id)) {
            gig.faqs = gig.faqs.filter((f) => f.id !== faq.id);
          }
        }
        if (gig.step < 4) {
          gig.step = 4;
        }
        gig.aboutGig = aboutGig;
        for (const faq of faqs) {
          if (!faq?.id) {
            const faqEntity = new FAQ();
            faqEntity.question = faq.question;
            faqEntity.answer = faq.answer;
            faqEntity.position = faq.position;
            gig.faqs.push(faqEntity);
          } else {
            const faqEntity = gig.faqs.find((f) => f.id === faq.id);
            faqEntity.question = faq.question;
            faqEntity.answer = faq.answer;
            faqEntity.position = faq.position;
          }
        }
      }
      if (transactionalEntityManager) {
        return await transactionalEntityManager.save(gig);
      } else {
        return await this.gigRepository.save(gig);
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private applyDynamicJoinsAndOrdering(
    queryBuilder: SelectQueryBuilder<Gig>,
    include: string,
  ) {
    const relations = include ? include.split(',') : [];

    const relationMapping: Record<
      string,
      (qb: SelectQueryBuilder<Gig>) => SelectQueryBuilder<Gig>
    > = {
      category: (qb) => qb.leftJoinAndSelect('gig.category', 'category'),
      service: (qb) => qb.leftJoinAndSelect('gig.service', 'service'),
      metadata: (qb) => qb.leftJoinAndSelect('gig.metadata', 'metadata'),
      tags: (qb) => qb.leftJoinAndSelect('gig.tags', 'tags'),
      packages: (qb) =>
        qb
          .leftJoinAndSelect('gig.packages', 'packages')
          .addOrderBy('packages.id', 'ASC'),
      packageFeatures: (qb) =>
        qb
          .leftJoinAndSelect('packages.packageFeatures', 'packageFeatures')

          .addOrderBy('packageFeatures.featureId')
          .leftJoinAndSelect('packageFeatures.feature', 'feature'),
      subcategory: (qb) =>
        qb.leftJoinAndSelect('gig.subcategory', 'subcategory'),
      faqs: (qb) =>
        qb
          .leftJoinAndSelect('gig.faqs', 'faqs')
          .addOrderBy('faqs.position', 'ASC'),
      questions: (qb) => qb.leftJoinAndSelect('gig.questions', 'question'),
      user: (qb) => qb.leftJoinAndSelect('gig.user', 'user'),
      userLanguages: (qb) =>
        qb.leftJoinAndSelect('user.languages', 'languages'),
      userRating: (qb) =>
        qb.leftJoinAndSelect(
          (subQuery) => {
            return subQuery
              .select('gigs.id', 'gigId')
              .addSelect(
                'CAST(COALESCE(COUNT(reviews.id), 0) AS INTEGER)',
                'user_userTotalReviews',
              )
              .addSelect(
                'CAST(COALESCE(ROUND(AVG(reviews.rating), 1), 0) AS FLOAT)',
                'user_userRating',
              )
              .from('gigs', 'gigs')
              .leftJoin('gig_reviews', 'reviews', 'gigs.id = reviews.gigId')
              .groupBy('gigs.id');
          },
          'userReviews',
          'gig.id = "userReviews"."gigId"',
        ),
      rating: (qb) => qb.leftJoinAndSelect('gig.rating', 'rating'),
      startingPrice: (qb) =>
        qb.addSelect(`
         (
    SELECT
      MIN(package_features.value) as "gig_startingPrice"
    FROM
      packages
    LEFT JOIN package_features ON packages.id = package_features."packageId"
    LEFT JOIN features f ON f.id = package_features."featureId"
    WHERE
      f."name" = 'Price'
      AND packages."gigId" = gig.id
    )
          `),

      metadataTags: (qb) =>
        qb.leftJoinAndSelect(
          'metadata.metadataTags',
          'metadata_tags',
          'metadata_tags.id IN (SELECT gmt."metadataTagId" FROM gig_metadata_tags gmt WHERE gmt."gigId" = gig.id)',
        ),

      reviews: (qb) =>
        qb
          .leftJoinAndSelect(
            (subQuery) => {
              return subQuery
                .select('review.id', 'id')
                .addSelect('review.gigId', 'gigId')
                .addSelect('review.rating', 'rating')
                .addSelect('review.review', 'review')
                .addSelect(
                  'ROW_NUMBER() OVER (PARTITION BY review."gigId" ORDER BY review.rating DESC)',
                  'rowNum',
                )
                .from('gig_reviews', 'review');
            },
            'topReviews',
            '"topReviews"."gigId" = gig.id AND "topReviews"."rowNum" <= 10',
          )
          .leftJoinAndMapMany(
            'gig.reviews',
            'gig_reviews',
            'reviews',
            'reviews.id = "topReviews".id',
          )
          .addOrderBy('reviews.rating', 'DESC')
          .leftJoin('reviews.user', 'reviewer')
          .addSelect([
            'reviewer.username',
            'reviewer.country',
            'reviewer.picture',
          ])
          .addSelect(
            'COALESCE("gigReviews"."gig_totalReviews", 0)',
            'gig_totalReviews',
          )
          .addSelect(
            'COALESCE("gigReviews"."gig_averageRating", 0)',
            'gig_averageRating',
          )
          .leftJoinAndSelect(
            (subQuery) =>
              subQuery
                .select('reviews.gigId', 'gigId')
                .addSelect('COUNT(*)', 'gig_totalReviews')
                .addSelect(
                  'COALESCE(ROUND(AVG(reviews.rating), 1), 0)',
                  'gig_averageRating',
                )
                .from('gig_reviews', 'reviews')
                .groupBy('reviews.gigId'),
            'gigReviews',
            'gig.id = "gigReviews"."gigId"',
          ),
      reviewsChart: (qb) => {
        // const ratingCountsSubQuery = qb
        //   .subQuery()
        //   .select('ROUND(rating::numeric)', 'rating')
        //   .addSelect('COUNT(*)', 'totalReviews')
        //   .addSelect('gig_reviews.gigId', 'gigId')
        //   .from('gig_reviews', 'gig_reviews')
        //   .groupBy('gig_reviews.gigId')
        //   .addGroupBy('ROUND(rating::numeric)')
        //   .getQuery();
        return qb.addSelect(
          `
          (
            SELECT
              jsonb_agg(
                jsonb_build_object(
                  'rating',
                  rating_counts.rating,
                  'totalReviews',
                  rating_counts."totalReviews"
                )
              )
            FROM
              (
                SELECT
                  ROUND(rating::numeric) AS rating,
                  COUNT(*) AS "totalReviews"
                FROM
                  "gig_reviews"
                WHERE
                  "gig_reviews"."gigId" = "gig"."id"
                GROUP BY
                  ROUND(rating::numeric)
              ) AS rating_counts
          )`,
          'gig_reviewsChart',
        );
      },
    };

    relations.forEach((relation) => {
      if (relationMapping[relation]) {
        queryBuilder = relationMapping[relation](queryBuilder);
      }
    });

    // queryBuilder = queryBuilder.addSelect('gig.id', 'gig_totalReviews');

    return queryBuilder;
  }

  async test() {
    const queryBuilder = this.gigRepository
      .createQueryBuilder('gig')
      .leftJoinAndSelect('gig.reviews', 'reviews')
      .offset(2) // Limit to 4 authors
      .limit(2); // Limit to 4 authors
    // console.log(queryBuilder.getSql());

    return await queryBuilder.getMany();
  }

  async getGigs(query: string, limit: number): Promise<Gig[]> {
    let queryBuilder = this.gigRepository.createQueryBuilder('gig');

    // Apply dynamic joins and ordering
    if (limit) {
      queryBuilder = queryBuilder
        // .distinctOn(['gig.id'])
        // .addOrderBy('gig.id')
        .limit(limit);
    }
    queryBuilder = this.applyDynamicJoinsAndOrdering(queryBuilder, query);

    // console.log(queryBuilder.getSql());

    // Execute the query and return the result
    const data = await queryBuilder.getMany();
    return data;
  }

  async getGigById(id: string, query: string): Promise<Gig> {
    let queryBuilder = this.gigRepository.createQueryBuilder('gig');

    // Apply dynamic joins and ordering
    queryBuilder = this.applyDynamicJoinsAndOrdering(queryBuilder, query);

    // Filter by the gig ID
    queryBuilder = queryBuilder.where('gig.id = :id', { id });
    // console.log(queryBuilder.getSql());

    // Execute the query and return the result
    const gig = await queryBuilder.getOne();

    if (!gig) {
      throw new NotFoundException(`Gig with ID ${id} not found`);
    }

    return gig;
  }

  async findOneById(id: string): Promise<Gig> {
    return this.gigRepository.findOne({
      where: { id },
      relations: [
        'faqs',
        'metadata',
        'metadataTags',
        'tags',
        'category',
        'service',
        'subcategory',
        'user',
      ],
    });
  }
}
