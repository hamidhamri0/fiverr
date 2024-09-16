import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './package.entity';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { FeatureModule } from '../feature/feature.module';
import { GigModule } from '../gig/gig.module';

@Module({
  imports: [TypeOrmModule.forFeature([Package]), FeatureModule, GigModule],
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService],
})
export class PackageModule {}
