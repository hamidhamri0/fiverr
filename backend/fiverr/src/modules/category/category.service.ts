import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO } from './DTO/create-category-dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories() {
    return this.categoryRepository.find();
  }

  async findOneById(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return this.categoryRepository.findOne({ where: { name } });
  }

  async createCategory(category: CreateCategoryDTO) {
    let newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  async deleteCategory(id: number) {
    return this.categoryRepository.delete({ id });
  }

  async deleteAllCategories() {
    return this.categoryRepository.delete({});
  }

  async updateCategory(id: number, category: CreateCategoryDTO) {
    return this.categoryRepository.update({ id }, category);
  }
}
