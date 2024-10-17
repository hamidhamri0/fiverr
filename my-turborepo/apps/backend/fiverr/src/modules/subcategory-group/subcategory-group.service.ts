import { Injectable } from '@nestjs/common';
import { SubcategoryGroup } from './subcategory-group.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'types/category';

@Injectable()
export class SubcategoryGroupService {
  constructor(
    @InjectRepository(SubcategoryGroup)
    private readonly subcategoryGroupRepository: Repository<SubcategoryGroup>,
  ) {}

  async findOneById(id: number) {
    return this.subcategoryGroupRepository.findOne({ where: { id } });
  }

  async findByName(name: string) {
    return this.subcategoryGroupRepository.findOne({ where: { name } });
  }

  async create(category: Category, name: string, picture: string) {
    const slug = name.replace(/\s+/g, '-').toLowerCase();
    return this.subcategoryGroupRepository.save({
      name,
      picture,
      category,
      slug,
    });
  }
}
