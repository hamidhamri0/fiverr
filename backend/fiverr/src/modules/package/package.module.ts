import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './package.entity';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';

@Module({
  imports: [TypeOrmModule.forFeature([Package])],
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService],
})
export class PackageModule {}
