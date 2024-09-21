import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { multerOptions } from './config/mutler.config';

// Multer filter for file type and size

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('image')
  @UseInterceptors(FilesInterceptor('files', 6, multerOptions()))
  async uploadImage(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files, 'haha');
    if (!files || files.length === 0) {
      throw new BadRequestException('File not provided');
    }
    return await Promise.all(
      files.map((file) => {
        if (file.mimetype.startsWith('image/')) {
          return this.cloudinaryService.uploadImage(file);
        } else if (file.mimetype.startsWith('video/')) {
          return this.cloudinaryService.uploadVideo(file);
        } else if (file.mimetype === 'application/pdf') {
          return this.cloudinaryService.uploadPDF(file);
        } else {
          throw new BadRequestException('Unsupported file type');
        }
      }),
    );
  }
}
