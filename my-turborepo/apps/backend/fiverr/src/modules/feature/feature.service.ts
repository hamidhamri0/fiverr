import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './feature.entity';
import { Repository } from 'typeorm';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { CreateFeatureDTO } from './DTO/create-feature.dto';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
    private readonly subcategoryService: SubcategoryService,
  ) {}

  async getAllFeatures() {
    return this.featureRepository.find();
  }

  async findOneById(id: number) {
    return this.featureRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return this.featureRepository.findOne({ where: { name } });
  }

  async getAllFeaturesBySubcategoryId(subcategoryId: number) {
    return this.featureRepository.find({
      where: { subcategory: { id: subcategoryId } },
      relations: ['options'],
    });
  }

  async createFeature(subcategoryId: number, feature: CreateFeatureDTO) {
    // Fetch the Subcategory entity using the subcategoryId from the DTO
    const subcategory =
      await this.subcategoryService.findOneById(subcategoryId);
    if (!subcategory) {
      throw new NotFoundException(
        `Subcategory with ID ${subcategoryId} not found`,
      );
    }
    // Create a new Feature entity and set the subcategory relationship
    const newFeature = this.featureRepository.create({
      ...feature,
      subcategory: subcategory,
    });
    // Save the new Feature entity to the database
    return this.featureRepository.save(newFeature);
  }

  async deleteFeature(id: number) {
    return this.featureRepository.delete({ id });
  }

  async deleteAllFeatures() {
    return this.featureRepository.delete({});
  }

  async updateFeature(id: number, feature: CreateFeatureDTO) {
    return this.featureRepository.update({ id }, feature);
  }
}
