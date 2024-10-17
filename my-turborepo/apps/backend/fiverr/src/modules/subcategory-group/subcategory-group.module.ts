import { Module } from '@nestjs/common';
import { SubcategoryGroupController } from './subcategory-group.controller';
import { SubcategoryGroupService } from './subcategory-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryGroup } from './subcategory-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoryGroup])],
  controllers: [SubcategoryGroupController],
  providers: [SubcategoryGroupService],
  exports: [SubcategoryGroupService],
})
export class SubcategoryGroupModule {}
