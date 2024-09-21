import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigController } from './gig.controller';
import { Gig } from './gig.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from '../service/service.module';
import { MetadataModule } from '../metadata/metadata.module';
import { MetadataTagModule } from '../metadata-tag/metadata-tag.module';
import { FaqModule } from '../faq/faq.module';
import { SubcategoryModule } from '../subcategory/subcategory.module';

@Module({
  imports: [
    SubcategoryModule,
    TypeOrmModule.forFeature([Gig]),
    ServiceModule,
    MetadataModule,
    MetadataTagModule,
    FaqModule,
  ],
  controllers: [GigController],
  providers: [GigService],
  exports: [GigService],
})
export class GigModule {}
