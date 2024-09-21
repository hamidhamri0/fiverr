import { HttpException, Injectable } from '@nestjs/common';
import { Gig } from './gig.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

@Injectable()
export class GigService {
  constructor(
    @InjectRepository(Gig)
    private gigRepository: Repository<Gig>,
    private subcategoryService: SubcategoryService,
  ) {}

  async updateGigAbout(gigId: string, aboutGig: string): Promise<Gig> {
    const gig = await this.findOneById(gigId);
    if (!gig) {
      throw new HttpException('Gig not found', 404);
    }
    gig.aboutGig = aboutGig;
    return this.gigRepository.save(gig);
  }

  async saveGig(gigId: string, gigDto: GigDTO): Promise<Gig> {
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
      console.log(
        faqs?.length && aboutGig && gig.step >= 3,
        faqs?.length,
        aboutGig,
        gig.step,
      );
      if (faqs?.length && aboutGig && gig.step >= 3) {
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

      console.log(gig);

      return this.gigRepository.save(gig);
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
      .where('gig.id = :id', { id });

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
