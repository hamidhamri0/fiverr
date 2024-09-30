import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
const MAX_FILE_SIZES = {
  image: 5 * 1024 * 1024, // 5MB for images
  video: 20 * 1024 * 1024, // 20MB for videos
  application: 3 * 1024 * 1024, // 3MB for PDFs
};
@Injectable()
export class FileSizeValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const files = req.files;
    if (files) {
      Object.keys(files).forEach((fieldName) => {
        console.log(files[fieldName]);
        const file = files[fieldName][0];
        const type = file.mimetype.startsWith('image')
          ? 'image'
          : file.mimetype.startsWith('video')
            ? 'video'
            : 'application';

        if (file.size > MAX_FILE_SIZES[type]) {
          throw new BadRequestException(
            `File ${fieldName} exceeds ${MAX_FILE_SIZES[type] / 1024 / 1024}MB limit for ${type} files`,
          );
        }
      });
    }

    return next.handle();
  }
}
