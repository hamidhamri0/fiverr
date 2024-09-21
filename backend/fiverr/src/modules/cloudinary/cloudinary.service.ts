import { Injectable, BadRequestException } from '@nestjs/common';
import { CloudinaryConfig } from './config/cloudinary.config';

@Injectable()
export class CloudinaryService {
  constructor(private readonly cloudinaryConfig: CloudinaryConfig) {}

  async uploadImage(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Apply transformations for the image, e.g., resize to width=500, height=500
    const transformations = [
      {
        quality: 'auto',
        fetch_format: 'auto',
      },
      {
        width: 1200,
        height: 1200,
        crop: 'fill',
        gravity: 'auto',
      },
    ];

    return this.cloudinaryConfig.uploadFile(file, 'image', transformations);
  }

  async uploadVideo(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new BadRequestException('No video uploaded');
    }

    // Example: Resize the video to a width of 1280px
    const transformations = {
      width: 1280,
      crop: 'limit',
    };

    return this.cloudinaryConfig.uploadFile(file, 'video', transformations);
  }

  async uploadPDF(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new BadRequestException('No PDF uploaded');
    }

    // No specific transformation for PDFs, you can set raw transformations
    return this.cloudinaryConfig.uploadFile(file, 'raw');
  }
}
