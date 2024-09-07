import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetadataTagService } from './metadata-tag.service';
import { MetadataTagController } from './metadata-tag.controller';
import { MetadataTag } from './metadata-tag.entity';
import { MetadataModule } from '../metadata/metadata.module';

@Module({
  imports: [TypeOrmModule.forFeature([MetadataTag]), MetadataModule],
  providers: [MetadataTagService],
  controllers: [MetadataTagController],
  exports: [MetadataTagService],
})
export class MetadataTagModule {}
