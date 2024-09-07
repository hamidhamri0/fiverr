import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class NameValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'string' || value.trim().length === 0) {
      throw new BadRequestException('Name is required and cannot be empty');
    }
    return value;
  }
}
