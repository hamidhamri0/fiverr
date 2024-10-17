import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from './subcategory.entity';
import { CategoryModule } from '../category/category.module';
import { SubcategoryGroupModule } from '@modules/subcategory-group/subcategory-group.module';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forFeature([Subcategory]),
    SubcategoryGroupModule,
  ],
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
