import { BadRequestException } from '@nestjs/common';
import * as multer from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const MAX_FILE_SIZES = {
  image: 5 * 1024 * 1024, // 5MB for images
  video: 20 * 1024 * 1024, // 20MB for videos
  pdf: 3 * 1024 * 1024, // 3MB for PDFs
};

export const multerOptions = (): MulterOptions => ({
  storage: multer.memoryStorage(),
  fileFilter: (req: any, file: Express.Multer.File, callback: any) => {
    const fileType = req.query.fileType || req.body.fileType;

    // Check file type
    if (
      (fileType === 'image' && !file.mimetype.startsWith('image')) ||
      (fileType === 'video' && !file.mimetype.startsWith('video')) ||
      (fileType === 'pdf' && file.mimetype !== 'application/pdf')
    ) {
      return callback(new BadRequestException('Invalid file type'), false);
    }
    const fileMaxSize = MAX_FILE_SIZES[fileType];

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
