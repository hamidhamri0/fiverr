import { Injectable, BadRequestException } from '@nestjs/common';
import { CloudinaryConfig } from './config/cloudinary.config';
import { GigService } from '../gig/gig.service';
import { DataSource } from 'typeorm';

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly cloudinaryConfig: CloudinaryConfig,
    private readonly gigService: GigService,
  ) {}
  uploadedFiles: { publicId: string; resourceType: string }[] = [];

  async handleFiles(
    files: {
      [key: string]: Express.Multer.File[];
    },
    body: {
      [key: string]: string;
    },
    gigId: string,
  ) {
    try {
      const result = {
        imageUrls: [] as string[],
        pdfUrls: [] as string[],
        videoUrl: {} as { videoUrl: string; thumbnail: string },
      };

      // Handle images
      for (let i = 0; i < 3; i++) {
        const fileKey = `image${i}`;
        const urlKey = `image${i}Url`;
        if (files[fileKey]) {
          const url = await this.uploadImage(files[fileKey][0]);
          this.uploadedFiles.push({
            publicId: url.public_id,
            resourceType: 'image',
          });
          result.imageUrls.push(url.transformed_url);
        } else if (body[urlKey]) {
          result.imageUrls.push(body[urlKey]);
        }
      }

      // Handle PDFs
      for (let i = 0; i < 2; i++) {
        const fileKey = `pdf${i}`;
        const urlKey = `pdf${i}Url`;
        if (files[fileKey]) {
          const url = await this.uploadPDF(files[fileKey][0]);
          result.pdfUrls.push(url.transformed_url);
          this.uploadedFiles.push({
            publicId: url.public_id,
            resourceType: 'raw',
          });
        } else if (body[urlKey]) {
          result.pdfUrls.push(body[urlKey]);
        }
      }

      // Handle video
      if (files.video) {
        const url = await this.uploadVideo(files.video[0]);
        result.videoUrl['videoUrl'] = url.transformed_url;
        result.videoUrl['thumbnail'] = url.thumbnailUrl;
        this.uploadedFiles.push({
          publicId: url.public_id,
          resourceType: 'video',
        });
      } else if (body.videoUrl) {
        result.videoUrl = JSON.parse(body.videoUrl);
      }

      // Save results to database
      await this.gigService.updateFiles(result, gigId);

      return result;
    } catch (err) {
      for (const file of this.uploadedFiles) {
        await this.cloudinaryConfig.deleteFile(
          file.publicId,
          file.resourceType,
        );
      }
      throw new BadRequestException(err.message);
    }
  }

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
