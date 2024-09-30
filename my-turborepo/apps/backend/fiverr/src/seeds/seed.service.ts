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
    ];

    const deliveryTimeOptions = [
      '1 DAY DELIVERY',
      '2 DAYS DELIVERY',
      '3 DAYS DELIVERY',
      '4 DAYS DELIVERY',
      '5 DAYS DELIVERY',
      '6 DAYS DELIVERY',
      '7 DAYS DELIVERY',
      '14 DAYS DELIVERY',
      '21 DAYS DELIVERY',
      '28 DAYS DELIVERY',
      '35 DAYS DELIVERY',
      '42 DAYS DELIVERY',
      '49 DAYS DELIVERY',
      '56 DAYS DELIVERY',
      '63 DAYS DELIVERY',
      '70 DAYS DELIVERY',
      '77 DAYS DELIVERY',
      '84 DAYS DELIVERY',
      '91 DAYS DELIVERY',
      '98 DAYS DELIVERY',
    ];

    const categories = [
      {
        name: 'Technology & Programming',
        subcategories: [
          {
            name: 'Web Development',
            features: [
              { name: 'Package Name', type: 'input', options: null },
              { name: 'Package Description', type: 'input', options: null },
              {
                name: 'Delivery Time',
                type: 'select',
                options: deliveryTimeOptions,
              },
              {
                name: 'Framework',
                type: 'select',
                options: ['React', 'Angular', 'Vue.js', 'Svelte'],
              },
              {
                name: 'CSS Preprocessor',
                type: 'select',
                options: ['Sass', 'Less', 'Stylus', 'PostCSS'],
              },
              { name: 'Responsive Design', type: 'checkbox', options: null },
              { name: 'Code Review', type: 'checkbox', options: null },
              {
                name: 'Testing Framework',
                type: 'select',
                options: ['Jest', 'Mocha', 'Chai', 'Jasmine'],
              },
              {
                name: 'Build Tool',
                type: 'select',
                options: ['Webpack', 'Gulp', 'Grunt', 'Parcel'],
              },
              {
                name: 'Version Control',
                type: 'select',
                options: ['Git', 'SVN', 'Mercurial'],
              },
              { name: 'Price', type: 'range', options: null },
            ],
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
            features: [
              { name: 'Package Name', type: 'input', options: null },
              { name: 'Package Description', type: 'input', options: null },
              {
                name: 'Delivery Time',
                type: 'select',
                options: deliveryTimeOptions,
              },
              {
                name: 'Platform',
                type: 'select',
                options: ['iOS', 'Android', 'Cross-platform'],
              },
              {
                name: 'App Type',
                type: 'select',
                options: ['Native', 'Hybrid', 'PWA'],
              },
              {
                name: 'UI Framework',
                type: 'select',
                options: ['UIKit', 'SwiftUI', 'Storyboard'],
              },
              {
                name: 'Testing Framework',
                type: 'select',
                options: ['JUnit', 'Espresso', 'XCTest'],
              },
              {
                name: 'Build Tool',
                type: 'select',
                options: ['Gradle', 'Maven', 'CocoaPods'],
              },
              {
                name: 'Version Control',
                type: 'select',
                options: ['Git', 'SVN', 'Mercurial'],
              },
              { name: 'Price', type: 'range', options: null },
            ],
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
            features: [
              { name: 'Package Name', type: 'input', options: null },
              { name: 'Package Description', type: 'input', options: null },
              {
                name: 'Delivery Time',
                type: 'select',
                options: deliveryTimeOptions,
              },
              {
                name: 'Style',
                type: 'select',
                options: ['Minimalist', 'Vintage', 'Hand-drawn', 'Abstract'],
              },
              {
                name: 'File Format',
                type: 'select',
                options: ['AI', 'EPS', 'PNG', 'SVG'],
              },
              { name: 'Source Files', type: 'checkbox', options: null },
              {
                name: 'Color Scheme',
                type: 'select',
                options: [
                  'Monochrome',
                  'Analogous',
                  'Complementary',
                  'Triadic',
                ],
              },
              {
                name: 'Design Tool',
                type: 'select',
                options: ['Adobe Illustrator', 'CorelDRAW', 'Inkscape'],
              },
              { name: 'Print Ready', type: 'checkbox', options: null },
              { name: 'Price', type: 'range', options: null },
            ],
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
            features: [
              { name: 'Package Name', type: 'input', options: null },
              { name: 'Package Description', type: 'input', options: null },
              {
                name: 'Delivery Time',
                type: 'select',
                options: deliveryTimeOptions,
              },
              {
                name: 'Design Tool',
                type: 'select',
                options: ['Figma', 'Sketch', 'Adobe XD', 'InVision'],
              },
              { name: 'Responsive Design', type: 'checkbox', options: null },
              { name: 'Prototyping', type: 'checkbox', options: null },
              { name: 'User Testing', type: 'checkbox', options: null },
              {
                name: 'Wireframing',
                type: 'select',
                options: ['Low-fidelity', 'High-fidelity'],
              },
              { name: 'Accessibility', type: 'checkbox', options: null },
              {
                name: 'Interaction Design',
                type: 'select',
                options: ['Microinteractions', 'Animations'],
              },
              { name: 'Price', type: 'range', options: null },
            ],
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
            features: [
              { name: 'Package Name', type: 'input', options: null },
              { name: 'Package Description', type: 'input', options: null },
              {
                name: 'Delivery Time',
                type: 'select',
                options: deliveryTimeOptions,
              },
              {
                name: 'Topics',
                type: 'select',
                options: [
                  'Technology',
                  'Health',
                  'Finance',
                  'Travel',
                  'Lifestyle',
                ],
              },
              { name: 'SEO Optimization', type: 'checkbox', options: null },
              {
                name: 'Tone',
                type: 'select',
                options: ['Professional', 'Casual', 'Humorous', 'Formal'],
              },
              { name: 'Research', type: 'checkbox', options: null },
              { name: 'Plagiarism Check', type: 'checkbox', options: null },
              { name: 'Price', type: 'range', options: null },
            ],
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
            features: [
              { name: 'Package Name', type: 'input', options: null },
              { name: 'Package Description', type: 'input', options: null },
              {
                name: 'Delivery Time',
                type: 'select',
                options: deliveryTimeOptions,
              },
              {
                name: 'Language Pair',
                type: 'select',
                options: [
                  'English to Spanish',
                  'English to French',
                  'Chinese to English',
                  'German to English',
                ],
              },
              {
                name: 'Specialization',
                type: 'select',
                options: ['Business', 'Technical', 'Literary', 'Medical'],
              },
              {
                name: 'Certification',
                type: 'select',
                options: ['Certified', 'Notarized', 'Standard'],
              },
              { name: 'Proofreading', type: 'checkbox', options: null },
              { name: 'Localization', type: 'checkbox', options: null },
              { name: 'Price', type: 'range', options: null },
            ],
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

    for (const tag of tags) {
      await this.tagService.createTag(tag);
    }

    for (const categoryData of categories) {
      const category = await this.categoryService.createCategory({
        name: categoryData.name,
      });

      for (const subcategoryData of categoryData.subcategories) {
        const subcategory = await this.subcategoryService.createSubcategory(
          category.id,
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

    console.log('Database seeded successfully!');
  }
}
