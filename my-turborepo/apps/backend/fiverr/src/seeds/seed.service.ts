import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { MetadataTagService } from 'src/modules/metadata-tag/metadata-tag.service';
import { MetadataService } from 'src/modules/metadata/metadata.service';
import { ServiceService } from 'src/modules/service/service.service';
import { SubcategoryService } from 'src/modules/subcategory/subcategory.service';
import { MetadataType } from '../modules/metadata/DTO/create-metadata.dto';
import { TagService } from 'src/modules/tag/tag.service';
import { FeatureService } from 'src/modules/feature/feature.service';
import { FeatureOptionService } from 'src/modules/feature-option/feature-option.service';
import { categories } from './test';
import { SubcategoryGroupService } from '@modules/subcategory-group/subcategory-group.service';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly subcategoryService: SubcategoryService,
    private readonly serviceService: ServiceService,
    private readonly metadataService: MetadataService,
    private readonly metadataTagService: MetadataTagService,
    private readonly tagService: TagService,
    private readonly FeatureService: FeatureService,
    private readonly FeatureOptionService: FeatureOptionService,
    private readonly subcategoryGroup: SubcategoryGroupService,
  ) {}

  async deleteAll() {
    await this.metadataTagService.deleteAllMetadataTag();
    await this.metadataService.deleteAllMetadata();
    await this.serviceService.deleteAllServices();
    await this.subcategoryService.deleteAllSubcategories();
    await this.categoryService.deleteAllCategories();
    await this.tagService.deleteAllTags();
    await this.FeatureService.deleteAllFeatures();
    await this.FeatureOptionService.deleteAllFeatureOptions();
  }

  async seed() {
    const tags = [
      'Web Development',
      'Mobile App Development',
      'Frontend Development',
      'Backend Development',
      'Full Stack Development',
      'iOS Development',
      'Android Development',
      'Graphic Design',
      'Logo Design',
      'Brand Identity',
      'UX/UI Design',
      'Web Design',
      'Mobile App Design',
      'Content Writing',
      'Copywriting',
      'Blog Posts',
      'Translation',
      'General Translation',
      'Legal Translation',
      'Audio Mixing',
      'Audio Mastering',
      'Podcast Editing',
      'Video Editing',
    ];

    for (const tag of tags) {
      await this.tagService.createTag(tag);
    }

    for (const categoryData of categories) {
      const category = await this.categoryService.createCategory({
        name: categoryData.name,
        image: categoryData.image,
      });

      for (const subcategoryGroup of categoryData.subcategoryGroups) {
        let subcategoryGrp;
        const existingSubcategoryGroup = await this.subcategoryGroup.findByName(
          subcategoryGroup.subcategoryGroup,
        );

        if (existingSubcategoryGroup) {
          subcategoryGrp = existingSubcategoryGroup;
        } else {
          subcategoryGrp = await this.subcategoryGroup.create(
            category,
            subcategoryGroup.subcategoryGroup,
            subcategoryGroup.image,
          );
        }

        for (const subcategoryData of subcategoryGroup.subcategories) {
          const subcategory = await this.subcategoryService.createSubcategory(
            category.id,
            subcategoryGrp.id,
            { name: subcategoryData.name },
          );
          for (const featureData of subcategoryData.features) {
            const feature = await this.FeatureService.createFeature(
              subcategory.id,
              {
                name: featureData.name,
                type:
                  featureData.type === 'select'
                    ? 'select'
                    : featureData.type === 'checkbox'
                      ? 'checkbox'
                      : featureData.type === 'input'
                        ? 'input'
                        : featureData.type === 'range'
                          ? 'range'
                          : null,
              },
            );

            if (featureData.type === 'select' && featureData.options?.length) {
              for (const option of featureData.options) {
                await this.FeatureOptionService.createFeatureOption(
                  feature.id,
                  option,
                );
              }
            }
          }

          for (const serviceData of subcategoryData.services) {
            const service = await this.serviceService.createService({
              name: serviceData.name,
              subcategoryId: subcategory.id,
              image: serviceData.image,
            });

            for (const metadataData of serviceData.metadata) {
              const metadata = await this.metadataService.createMetadata({
                serviceId: service.id,
                name: metadataData.name,
                type:
                  metadataData.type === 'select'
                    ? MetadataType.SELECT
                    : MetadataType.MULTI_SELECT,
              });
              for (const tagName of metadataData.tags) {
                await this.metadataTagService.createMetadataTag({
                  name: tagName,
                  metadataId: metadata.id,
                });
              }
            }
          }
        }
      }
    }

    console.log('Database seeded successfully!');
  }
}
