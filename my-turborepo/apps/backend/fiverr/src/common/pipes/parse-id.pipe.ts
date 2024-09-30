import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const id = parseInt(value, 10);
    if (isNaN(id)) {
      throw new BadRequestException(
        `Validation failed (numeric string is expected) ${value} is not a number`,
      );
    }
    return id;
  }
}
