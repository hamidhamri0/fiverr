import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { Feature } from './feature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryModule } from '../subcategory/subcategory.module';

@Module({
  imports: [TypeOrmModule.forFeature([Feature]), SubcategoryModule],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [FeatureService],
})
export class FeatureModule {}
