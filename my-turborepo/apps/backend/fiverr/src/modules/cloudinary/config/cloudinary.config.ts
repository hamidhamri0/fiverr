// cloudinary.config.ts
import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryConfig {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  uploadFile(
    file: Express.Multer.File,
    resourceType: 'image' | 'video' | 'raw',
    transformations: any = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const originalName = file.originalname.split('.')[0];
      cloudinary.uploader.multi;
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          format:
            resourceType === 'image'
              ? 'webp'
              : resourceType === 'video'
                ? 'mp4'
                : 'pdf',
          public_id: originalName.trim().replace(/[^a-zA-Z0-9_]/g, ''),
        },
        (error, result) => {
          if (error) return reject(error.message);
          const transformedUrl = cloudinary.url(result.public_id, {
            transformation: transformations,
            secure: true,
          });
          let thumbnailUrl = null;
          if (resourceType === 'video') {
            thumbnailUrl = cloudinary.url(result.public_id, {
              transformation: [
                { width: 300, height: 300, crop: 'thumb', gravity: 'auto' },
              ],
              format: 'webp',
              resource_type: 'video',
              secure: true,
              start_offset: 'auto',
            });
          }
          resolve({
            ...result,
            transformed_url: transformedUrl,
            thumbnailUrl,
          });
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  async deleteFile(publicId: string, resourceType: string) {
    return cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  }
}
