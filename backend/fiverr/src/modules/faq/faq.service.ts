import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FAQ } from './faq.entity';
import { FaqDTO } from './DTO/faq-dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(FAQ) private readonly faqRepository: Repository<FAQ>,
  ) {}

  async saveFaq(faq: FaqDTO) {
    return this.faqRepository.save(faq);
  }

  async findAll() {
    return this.faqRepository.find();
  }

  async findOne(id: number) {
    return this.faqRepository.findOneBy({ id });
  }
}
