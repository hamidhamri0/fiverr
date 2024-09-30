import {
  Controller,
  Post,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  HttpStatus,
  Param,
  Body,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { multerOptions } from './config/mutler.config';
import { FileSizeValidationInterceptor } from './interceptors/file-size.interceptor';

// Multer filter for file type and size

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post('files/:gigId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image0', maxCount: 1 },
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'pdf0', maxCount: 1 },
        { name: 'pdf1', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      multerOptions(),
    ),
    FileSizeValidationInterceptor,
  )
  async uploadFiles(
    @UploadedFiles() files,
    @Body() body,
    @Param('gigId') gigId: string,
  ) {
    return this.cloudinaryService.handleFiles(files, body, gigId);
  }
}
