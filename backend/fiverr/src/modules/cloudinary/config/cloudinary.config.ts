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
        },
        (error, result) => {
          if (error) reject(error);
          if (!result.public_id) reject('File failed to upload');
          const transformedUrl = cloudinary.url(result.public_id, {
            transformation: transformations,
            secure: true,
          });
          resolve({
            ...result,
            transformed_url: transformedUrl,
          });
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
