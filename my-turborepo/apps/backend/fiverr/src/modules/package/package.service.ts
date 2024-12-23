import { BadRequestException, Injectable } from '@nestjs/common';
import { Package } from './package.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageFeature } from '../package-feature/package-feature.entity';
import { createPackageDTO } from './DTO/createPackageDto';
import { FeatureService } from '../feature/feature.service';
import { Gig } from '../gig/gig.entity';
import { GigService } from '../gig/gig.service';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
    private readonly featureService: FeatureService,
    private readonly gigService: GigService,
  ) {}

  async getAllPackages() {
    return this.packageRepository.find();
  }

  async findOneById(id: number) {
    return this.packageRepository.findOne({
      where: { id },
      relations: ['packageFeatures.feature'],
    });
  }
  async findOneByGigId(gigId: string) {
    return this.packageRepository.findOne({
      where: { gig: { id: gigId } },
    });
  }
  async createPackage(
    gigId: string,
    createPackageDTO: createPackageDTO,
    transactionalEntityManager: EntityManager,
  ) {
    const sharedFeatures = ['name', 'description', 'price', 'deliveryTime'];
    const gig = await this.gigService.findOneById(gigId);
    if (gig.step < 3) {
      gig.step = 3;
    }
    if (!gig) {
      throw new Error(`Gig with id ${gigId} not found`);
    }

    const packageExists = await this.findOneByGigId(gigId);
    if (packageExists) {
      throw new BadRequestException(`Package for gig already exists`);
    }

    try {
      const createPackageWithFeatures = async (
        packageType: 'basic' | 'standard' | 'premium',
        features: { [key: string]: string },
      ) => {
        const newPackage = new Package();
        newPackage.type = packageType;
        newPackage.gig = { id: gigId } as Gig;
        newPackage.packageFeatures = [];

        for (const sharedFeature of sharedFeatures) {
          if (features[sharedFeature]) {
            newPackage[sharedFeature] = features[sharedFeature];
          }
        }

        for (const feature in features) {
          if (sharedFeatures.includes(feature) || isNaN(Number(feature)))
            continue;
          const featureEntity = await this.featureService.findOneById(
            Number(feature),
          );
          if (!featureEntity) {
            throw new Error(`Feature with id ${feature} not found`);
          }

          const newPackageFeature = new PackageFeature();
          newPackageFeature.feature = featureEntity;
          newPackageFeature.value = features[feature];
          newPackage.packageFeatures.push(newPackageFeature);
        }

        await transactionalEntityManager.save(newPackage);
        await transactionalEntityManager.save(gig);
      };

      await createPackageWithFeatures('basic', createPackageDTO.basic);
      await createPackageWithFeatures('standard', createPackageDTO.standard);
      await createPackageWithFeatures('premium', createPackageDTO.premium);

      return this.findOneByGigId(gigId);
    } catch (error) {
      throw new Error('Transaction failed: ' + error.message);
    }
  }

  async findOneByPackageTypeAndGigId(
    packageType: 'basic' | 'standard' | 'premium',
    gigId: string,
  ) {
    return await this.packageRepository.findOne({
      where: { type: packageType, gig: { id: gigId } },
      relations: ['packageFeatures'],
    });
  }
  async updatePackage(
    gigId: string,
    createPackageDTO: createPackageDTO,
    transactionalEntityManager: EntityManager,
  ) {
    const sharedFeatures = ['name', 'description', 'price', 'deliveryTime'];
    const gig = await this.gigService.findOneById(gigId);
    if (!gig) {
      throw new Error(`Gig with id ${gigId} not found`);
    }
    try {
      const updatePackageFeatures = async (
        packageType: 'basic' | 'standard' | 'premium',
        newFeatures: { [key: string]: string },
      ) => {
        const existingPackage = await this.findOneByPackageTypeAndGigId(
          packageType,
          gigId,
        );
        for (const sharedFeature of sharedFeatures) {
          if (newFeatures[sharedFeature]) {
            existingPackage[sharedFeature] = newFeatures[sharedFeature];
          }
        }

        if (!existingPackage) {
          throw new Error(
            `Package of type ${packageType} not found for gig ${gigId}`,
          );
        }

        const featuresToUpdate = [];
        for (const featureId in newFeatures) {
          // these features should be on the package entity
          if (sharedFeatures.includes(featureId) || isNaN(Number(featureId))) {
            continue;
          }
          const existingFeature = existingPackage.packageFeatures.find(
            (f) => f.featureId === Number(featureId),
          );

          if (existingFeature) {
            if (existingFeature.value !== newFeatures[featureId]) {
              existingFeature.value = newFeatures[featureId];
              featuresToUpdate.push(existingFeature);
            }
          } else {
            const featureEntity = await this.featureService.findOneById(
              Number(featureId),
            );
            if (!featureEntity) {
              throw new Error(`Feature with id ${featureId} not found`);
            }

            const newPackageFeature = new PackageFeature();
            newPackageFeature.feature = featureEntity;
            newPackageFeature.value = newFeatures[featureId];
            newPackageFeature.package = existingPackage;
            featuresToUpdate.push(newPackageFeature);
          }
        }

        await transactionalEntityManager.save(existingPackage);
        if (featuresToUpdate.length > 0) {
          await transactionalEntityManager.save(featuresToUpdate);
        }
      };

      await updatePackageFeatures('basic', createPackageDTO.basic);
      await updatePackageFeatures('standard', createPackageDTO.standard);
      await updatePackageFeatures('premium', createPackageDTO.premium);
      if (gig.step < 3) {
        await transactionalEntityManager.update(
          Gig,
          { id: gigId },
          { step: 3 },
        );
      }

      return this.findOneByGigId(gigId);
    } catch (error) {
      throw new Error('Transaction failed: ' + error.message);
    }
  }
}
