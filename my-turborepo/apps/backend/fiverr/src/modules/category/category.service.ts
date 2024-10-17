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

  async getCategoryWithSubCategoryGroupsByCategoryName(slug: string) {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.subcategoryGroups', 'subcategoryGroups')
      .leftJoinAndSelect('subcategoryGroups.subcategories', 'subcategories')
      .where('category.slug = :slug', {
        slug,
      });
    return await queryBuilder.getOne();
  }

  async findOneByName(name: string) {
    return this.categoryRepository.findOne({ where: { name } });
  }

  async createCategory(category: CreateCategoryDTO) {
    const slug = category.name.replace(/\s+/g, '-').toLowerCase();
    const newCategory = this.categoryRepository.create({
      ...category,
      slug,
    });
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
