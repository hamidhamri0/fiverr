import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryConfig } from './config/cloudinary.config';
import { GigModule } from '../gig/gig.module';

@Module({
  imports: [GigModule],
  providers: [CloudinaryService, CloudinaryConfig],
  controllers: [CloudinaryController],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
