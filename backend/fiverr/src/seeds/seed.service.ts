import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { MetadataTagService } from 'src/modules/metadata-tag/metadata-tag.service';
import { MetadataService } from 'src/modules/metadata/metadata.service';
import { ServiceService } from 'src/modules/service/service.service';
import { SubcategoryService } from 'src/modules/subcategory/subcategory.service';
import { MetadataType } from '../modules/metadata/DTO/create-metadata.dto';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly subcategoryService: SubcategoryService,
    private readonly serviceService: ServiceService,
    private readonly metadataService: MetadataService,
    private readonly metadataTagService: MetadataTagService,
  ) {}

  async deleteAll() {
    await this.metadataTagService.deleteAllMetadataTag();
    await this.metadataService.deleteAllMetadata();
    await this.serviceService.deleteAllServices();
    await this.subcategoryService.deleteAllSubcategories();
    await this.categoryService.deleteAllCategories();
  }

  async seed() {
    const categories = [
      {
        name: 'Technology & Programming',
        subcategories: [
          {
            name: 'Web Development',
            services: [
              {
                name: 'Frontend Development',
                metadata: [
                  {
                    name: 'Framework',
                    type: 'select',
                    tags: ['React', 'Angular', 'Vue.js', 'Svelte'],
                  },
                  {
                    name: 'CSS Preprocessor',
                    type: 'multi_select',
                    tags: ['Sass', 'Less', 'Stylus', 'PostCSS'],
                  },
                ],
              },
              {
                name: 'Backend Development',
                metadata: [
                  {
                    name: 'Language',
                    type: 'select',
                    tags: ['Node.js', 'Python', 'Java', 'Ruby', 'PHP'],
                  },
                  {
                    name: 'Database',
                    type: 'multi_select',
                    tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
                  },
                ],
              },
              {
                name: 'Full Stack Development',
                metadata: [
                  {
                    name: 'Stack',
                    type: 'select',
                    tags: ['MEAN', 'MERN', 'LAMP', 'Ruby on Rails'],
                  },
                  {
                    name: 'Version Control',
                    type: 'select',
                    tags: ['Git', 'SVN', 'Mercurial'],
                  },
                ],
              },
            ],
          },
          {
            name: 'Mobile App Development',
            services: [
              {
                name: 'iOS Development',
                metadata: [
                  {
                    name: 'Language',
                    type: 'select',
                    tags: ['Swift', 'Objective-C'],
                  },
                  {
                    name: 'UI Framework',
                    type: 'multi_select',
                    tags: ['UIKit', 'SwiftUI', 'Storyboard'],
                  },
                ],
              },
              {
                name: 'Android Development',
                metadata: [
                  {
                    name: 'Language',
                    type: 'select',
                    tags: ['Java', 'Kotlin'],
                  },
                  {
                    name: 'Architecture',
                    type: 'multi_select',
                    tags: ['MVVM', 'MVP', 'MVI'],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Design & Creative',
        subcategories: [
          {
            name: 'Graphic Design',
            services: [
              {
                name: 'Logo Design',
                metadata: [
                  {
                    name: 'Style',
                    type: 'multi_select',
                    tags: ['Minimalist', 'Vintage', 'Hand-drawn', 'Abstract'],
                  },
                  {
                    name: 'File Format',
                    type: 'multi_select',
                    tags: ['AI', 'EPS', 'PNG', 'SVG'],
                  },
                ],
              },
              {
                name: 'Brand Identity',
                metadata: [
                  {
                    name: 'Deliverables',
                    type: 'multi_select',
                    tags: [
                      'Logo',
                      'Business Cards',
                      'Letterhead',
                      'Brand Guidelines',
                    ],
                  },
                  {
                    name: 'Industry',
                    type: 'select',
                    tags: [
                      'Technology',
                      'Food & Beverage',
                      'Fashion',
                      'Healthcare',
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'UX/UI Design',
            services: [
              {
                name: 'Web Design',
                metadata: [
                  {
                    name: 'Design Tool',
                    type: 'select',
                    tags: ['Figma', 'Sketch', 'Adobe XD', 'InVision'],
                  },
                  {
                    name: 'Responsive Design',
                    type: 'select',
                    tags: ['Yes', 'No'],
                  },
                ],
              },
              {
                name: 'Mobile App Design',
                metadata: [
                  {
                    name: 'Platform',
                    type: 'multi_select',
                    tags: ['iOS', 'Android', 'Cross-platform'],
                  },
                  {
                    name: 'App Type',
                    type: 'select',
                    tags: ['Native', 'Hybrid', 'PWA'],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Writing & Translation',
        subcategories: [
          {
            name: 'Content Writing',
            services: [
              {
                name: 'Blog Posts',
                metadata: [
                  {
                    name: 'Word Count',
                    type: 'select',
                    tags: ['500-1000', '1000-1500', '1500-2000', '2000+'],
                  },
                  {
                    name: 'Topics',
                    type: 'multi_select',
                    tags: [
                      'Technology',
                      'Health',
                      'Finance',
                      'Travel',
                      'Lifestyle',
                    ],
                  },
                ],
              },
              {
                name: 'Copywriting',
                metadata: [
                  {
                    name: 'Type',
                    type: 'multi_select',
                    tags: [
                      'Website Copy',
                      'Product Descriptions',
                      'Ad Copy',
                      'Email Copy',
                    ],
                  },
                  {
                    name: 'Tone',
                    type: 'select',
                    tags: ['Professional', 'Casual', 'Humorous', 'Formal'],
                  },
                ],
              },
            ],
          },
          {
            name: 'Translation',
            services: [
              {
                name: 'General Translation',
                metadata: [
                  {
                    name: 'Language Pair',
                    type: 'select',
                    tags: [
                      'English to Spanish',
                      'English to French',
                      'Chinese to English',
                      'German to English',
                    ],
                  },
                  {
                    name: 'Specialization',
                    type: 'multi_select',
                    tags: ['Business', 'Technical', 'Literary', 'Medical'],
                  },
                ],
              },
              {
                name: 'Legal Translation',
                metadata: [
                  {
                    name: 'Document Type',
                    type: 'multi_select',
                    tags: [
                      'Contracts',
                      'Patents',
                      'Court Documents',
                      'Legal Certificates',
                    ],
                  },
                  {
                    name: 'Certification',
                    type: 'select',
                    tags: ['Certified', 'Notarized', 'Standard'],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    for (const categoryData of categories) {
      const category = await this.categoryService.createCategory({
        name: categoryData.name,
      });

      for (const subcategoryData of categoryData.subcategories) {
        const subcategory = await this.subcategoryService.createSubcategory(
          category.id,
          { name: subcategoryData.name },
        );

        for (const serviceData of subcategoryData.services) {
          const service = await this.serviceService.createService({
            name: serviceData.name,
            subcategoryId: subcategory.id,
          });

          for (const metadataData of serviceData.metadata) {
            const metadata = await this.metadataService.createMetadata({
              serviceId: service.id,
              name: metadataData.name,
              type:
                metadataData.type == 'select'
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

    console.log('Database seeded successfully!');
  }
}
