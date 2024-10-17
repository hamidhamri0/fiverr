import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './subcategory.entity';
import { Repository } from 'typeorm';
import { CreateSubcategoryDTO } from './DTO/create-subcategory.dto';
import { CategoryService } from '../category/category.service';
import { SubcategoryGroupService } from '@modules/subcategory-group/subcategory-group.service';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    private readonly categoryService: CategoryService,
    private readonly SubcategoryGroupService: SubcategoryGroupService,
  ) {}

  async getAllSubcategories() {
    return this.subcategoryRepository.find();
  }

  async getAllSubcategoriesByCategoryId(categoryId: number) {
    return this.subcategoryRepository.find({
      where: { category: { id: categoryId } },
    });
  }

  async findSubcategoriesByCategoryName(categoryName: string) {
    return this.subcategoryRepository
      .createQueryBuilder('subcategory')
      .innerJoinAndSelect('subcategory.category', 'category')
      .where('category.name = :categoryName', { categoryName })
      .limit(3)
      .getMany();
  }

  async findOneById(id: number) {
    return this.subcategoryRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return this.subcategoryRepository.findOne({ where: { name } });
  }
  async deleteAllSubcategories() {
    return this.subcategoryRepository.delete({});
  }

  async createSubcategory(
    categoryId: number,
    subcategoryGroupId: number,
    subcategory: CreateSubcategoryDTO,
  ) {
    // Fetch the Category entity using the categoryId from the DTO
    const category = await this.categoryService.findOneById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Fetch the SubcategoryGroup entity using the subcategoryGroupId from the DTO
    const subcategoryGroup =
      await this.SubcategoryGroupService.findOneById(subcategoryGroupId);

    if (!subcategoryGroup) {
      throw new NotFoundException(
        `Subcategory Group with ID ${subcategoryGroupId} not found`,
      );
    }

    // Create a new Subcategory entity and set the category relationship
    const slug = subcategory.name.replace(/\s+/g, '-').toLowerCase();
    const newSubcategory = this.subcategoryRepository.create({
      ...subcategory,
      category: category,
      group: subcategoryGroup,
      slug,
    });
    // Save the new Subcategory entity to the database
    return this.subcategoryRepository.save(newSubcategory);
  }

  async deleteSubcategory(id: number) {
    return this.subcategoryRepository.delete({ id });
  }

  async updateSubcategory(id: number, subcategory: CreateSubcategoryDTO) {
    return this.subcategoryRepository.update({ id }, subcategory);
  }
}
