import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageFeature } from './package-feature.entity';
import { Repository } from 'typeorm';
import { PackageService } from '../package/package.service';
import { createPackageFeatureDTO } from './DTO/create-package-feature.dto';

@Injectable()
export class PackageFeatureService {
  constructor(
    @InjectRepository(PackageFeature)
    private readonly packageFeatureRepository: Repository<PackageFeature>,
    private readonly packageService: PackageService,
  ) {}

  async getAllPackageFeatures() {
    return this.packageFeatureRepository.find();
  }

  async createPackageFeature(createPackageFeature: createPackageFeatureDTO) {
    const { packageId, featureId, value } = createPackageFeature;

    // Fetch the Package entity and check if the PackageFeature already exists in a single query
    const [packageEntity, packageFeature] = await Promise.all([
      this.packageService.findOneById(packageId),
      this.packageFeatureRepository.findOne({
        where: {
          packageId,
          featureId,
        },
      }),
    ]);

    if (!packageEntity) {
      throw new NotFoundException(`Package with ID ${packageId} not found`);
    }

    if (packageFeature) {
      throw new NotFoundException(
        `PackageFeature with packageId ${packageId} and featureId ${featureId} already exists`,
      );
    }
    // Create a new PackageFeature entity and set the package and feature relationships
    let newPackageFeature = this.packageFeatureRepository.create({
      package: packageEntity,
      featureId,
      value,
    });
    return this.packageFeatureRepository.save(newPackageFeature);
  }
}
