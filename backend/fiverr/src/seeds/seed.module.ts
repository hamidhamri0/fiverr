import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/modules/category/category.module';
import { MetadataTagModule } from 'src/modules/metadata-tag/metadata-tag.module';
import { MetadataModule } from 'src/modules/metadata/metadata.module';
import { ServiceModule } from 'src/modules/service/service.module';
import { SubcategoryModule } from 'src/modules/subcategory/subcategory.module';
import { DatabaseSeeder } from './seed.service';
import { SeedCommand } from './seedCommand';
import { SeedController } from './seed.controller';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [
    CategoryModule,
    SubcategoryModule,
    ServiceModule,
    MetadataModule,
    MetadataTagModule,
  ],
  controllers: [SeedController],
  providers: [DatabaseSeeder, SeedCommand],
})
export class SeederModule {}
