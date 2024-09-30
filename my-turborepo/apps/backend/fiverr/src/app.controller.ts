import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UsePipes(new CustomValidationPipe())
  @Post()
  CreateUser(@Body() body: any): string {
    return '';
  }
}
