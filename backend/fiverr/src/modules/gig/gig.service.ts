import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Gig } from './gig.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { GigDTO } from './DTO/gig.dto';
import { Category } from '../category/category.entity';
import { Service } from '../service/service.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { User } from '../user/user.entity';
import { Metadata } from '../metadata/metadata.entity';
import { MetadataTag } from '../metadata-tag/metadata-tag.entity';
import { Tag } from '../tag/tag.entity';
import { FAQ } from '../faq/faq.entity';
import { FaqService } from '../faq/faq.service';
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
  ) {}

  async updateGigAbout(gigId: string, aboutGig: string): Promise<Gig> {
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
    return this.gigRepository.save(gig);
  }

  async makeGigPublic(gigId: string): Promise<Gig> {
    const gig = await this.findOneById(gigId);
    if (!gig) {
      throw new HttpException('Gig not found', 404);
    }
    gig.isPublished = true;
    return this.gigRepository.save(gig);
  }

  async getAllGigsByUserId(userId: string): Promise<Gig[]> {
    return this.gigRepository.find({
      where: { user: { id: userId } },
    });
  }

  async deleteGig(gigId: string) {
    await this.gigRepository.delete({ id: gigId });
    return HttpStatus.NOT_MODIFIED;
  }

  // async saveFiles(gigId: string, type: string, url: string) {
  //   const gig = await this.findOneById(gigId);
  //   if (!gig) {
  //     throw new HttpException('Gig not found', 404);
  //   }
  //   if (type === 'image') {
  //     gig.imageUrls.push(url);
  //   } else if (type === 'video') {
  //     gig.videoUrl = url;
  //   } else if (type === 'pdf') {
  //     gig.pdfUrls.push(url);
  //   }
  //   return this.gigRepository.save(gig);
  // }

  async saveGigWithPackages(
    gigId: string,
    gigDto: SaveGigWithPackagesDTO,
  ): Promise<Gig> {
    // run transaction
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
      let metadataIds = [] as Metadata[];
      let metadataTagIds = [] as MetadataTag[];
      for (const metadataId in metadata) {
        metadataIds.push({ id: +metadataId } as Metadata);
        if (typeof metadata[metadataId] == 'number') {
          metadataTagIds.push({ id: metadata[metadataId] } as MetadataTag);
        } else {
          let ids = metadata[metadataId].map((id) => {
            const meta = { id } as MetadataTag;
            return meta;
          });
          metadataTagIds.push(...ids);
        }
      }
      gig.title = title;
      gig.category = { id: categoryId } as Category;
      gig.service = { id: serviceId } as Service;
      // const existingCategory =
      //   await this.subcategoryService.findOneById(subcategoryId);
      // if (gig.subcategory && gig.subcategory.name !== existingCategory.name) {
      //   gig.packages = [];
      //   gig.isPublished = false;
      // }
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
        gig.step = 4;
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

  async getGigWithAllRelations(id: string): Promise<Gig> {
    const queryBuilder = this.gigRepository
      .createQueryBuilder('gig')

      .leftJoinAndSelect('gig.category', 'category')
      .leftJoinAndSelect('gig.subcategory', 'subcategory')
      .leftJoinAndSelect('gig.service', 'service')
      .leftJoinAndSelect('gig.metadata', 'metadata')
      .leftJoinAndSelect(
        'metadata.metadataTags',
        'metadata_tags',
        'metadata_tags.id IN (SELECT gmt."metadataTagId" FROM gig_metadata_tags gmt WHERE gmt."gigId" = gig.id)',
      )
      .leftJoinAndSelect('gig.tags', 'tags')
      .leftJoinAndSelect('gig.packages', 'packages')
      .leftJoinAndSelect('packages.packageFeatures', 'packageFeatures')
      .leftJoinAndSelect('gig.faqs', 'faqs')
      .orderBy('faqs.position', 'ASC')
      .where('gig.id = :id', { id })
      .leftJoinAndSelect('gig.questions', 'question');

    return queryBuilder.getOne();
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
