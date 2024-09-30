import { Injectable, NotFoundException } from '@nestjs/common';
import { FeatureOption } from './feature-option.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FeatureService } from '../feature/feature.service';

@Injectable()
export class FeatureOptionService {
  constructor(
    @InjectRepository(FeatureOption)
    private readonly featureOptionRepository: Repository<FeatureOption>,
    private readonly featureService: FeatureService,
  ) {}

  async getAllFeatureOptions() {
    return this.featureOptionRepository.find();
  }

  async findOneById(id: number) {
    return this.featureOptionRepository.findOne({ where: { id } });
  }

  async findOneByValue(value: string) {
    return this.featureOptionRepository.findOne({ where: { value } });
  }

  async createFeatureOption(featureId: number, featureOptionValue: string) {
    // Fetch the Feature entity using the featureId from the DTO
    const feature = await this.featureService.findOneById(featureId);
    if (!feature) {
      throw new NotFoundException(`Feature with ID ${featureId} not found`);
    }
    // Create a new FeatureOption entity and set the feature relationship
    let newFeatureOption = this.featureOptionRepository.create({
      value: featureOptionValue,
      feature: feature,
    });
    // Save the new FeatureOption entity to the database
    return this.featureOptionRepository.save(newFeatureOption);
  }

  async deleteFeatureOption(id: number) {
    return this.featureOptionRepository.delete({ id });
  }

  async deleteAllFeatureOptions() {
    return this.featureOptionRepository.delete({});
  }

  async updateFeatureOption(id: number, featureOptionValue: string) {
    return this.featureOptionRepository.update(
      { id },
      { value: featureOptionValue },
    );
  }
}
