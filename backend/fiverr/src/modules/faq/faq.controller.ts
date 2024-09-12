import { Body, Controller, Get, Post } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDTO } from './DTO/create-faq-dto';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get('getAllFaqs')
  async getAllFaq() {
    return this.faqService.findAll();
  }

  @Post('createFaq')
  async createFaq(@Body() createFaqDto: CreateFaqDTO) {
    return this.faqService.create(createFaqDto);
  }
}
