import { BadRequestException } from '@nestjs/common';
import * as multer from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const MAX_FILE_SIZES = {
  image: 5 * 1024 * 1024, // 5MB for images
  video: 20 * 1024 * 1024, // 20MB for videos
  application: 3 * 1024 * 1024, // 3MB for PDFs
};

export const multerOptions = (): MulterOptions => ({
  storage: multer.memoryStorage(),
  fileFilter: (req: any, file: Express.Multer.File, callback: any) => {
    if (
      !file.mimetype.startsWith('image') &&
      !file.mimetype.startsWith('video') &&
      file.mimetype !== 'application/pdf'
    ) {
      return callback(new BadRequestException('Invalid file type'), false);
    }
    const type = file.mimetype.split('/')[0];
    const fileMaxSize = MAX_FILE_SIZES[type];

    if (file.size > fileMaxSize) {
      return callback(
        new BadRequestException(
          `File size exceeds ${fileMaxSize / 1024 / 1024}MB`,
        ),
        false,
      );
    }

    callback(null, true);
  },
});
