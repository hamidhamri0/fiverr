import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureOptionService } from './feature-option.service';
import { FeatureOptionController } from './feature-option.controller';
import { FeatureOption } from './feature-option.entity';
import { FeatureModule } from '../feature/feature.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureOption]), FeatureModule],
  controllers: [FeatureOptionController],
  providers: [FeatureOptionService],
})
export class FeatureOptionModule {}
