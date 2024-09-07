import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageFeatureService } from './package-feature.service';
import { PackageFeatureController } from './package-feature.controller';
import { PackageFeature } from './package-feature.entity';
import { PackageModule } from '../package/package.module';

@Module({
  imports: [TypeOrmModule.forFeature([PackageFeature]), PackageModule],
  controllers: [PackageFeatureController],
  providers: [PackageFeatureService],
})
export class PackageFeatureModule {}
