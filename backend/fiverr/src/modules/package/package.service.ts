import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Package } from './package.entity';
import { EntityManager, Feature, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageFeature } from '../package-feature/package-feature.entity';
import { createPackageDTO } from './DTO/createPackageDto';
import { FeatureService } from '../feature/feature.service';
import { PackageFeatureService } from '../package-feature/package-feature.service';
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
    return this.packageRepository.find({
      where: { gig: { id: gigId } },
    });
  }
  async createPackage(gigId: string, createPackageDTO: createPackageDTO) {
    const gig = await this.gigService.findOneById(gigId);
    gig.step = 3;
    if (!gig) {
      throw new Error(`Gig with id ${gigId} not found`);
    }

    const packageExists = await this.findOneByGigId(gigId);
    if (packageExists.length > 0) {
      throw new BadRequestException(`Package for gig already exists`);
    }

    return await this.packageRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const createPackageWithFeatures = async (
            packageType: 'basic' | 'standard' | 'premium',
            features: { [key: string]: string },
          ) => {
            const newPackage = new Package();
            newPackage.type = packageType;
            newPackage.gig = { id: gigId } as Gig;
            newPackage.packageFeatures = [];

            for (const feature in features) {
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
          await createPackageWithFeatures(
            'standard',
            createPackageDTO.standard,
          );
          await createPackageWithFeatures('premium', createPackageDTO.premium);

          return this.findOneByGigId(gigId);
        } catch (error) {
          throw new Error('Transaction failed: ' + error.message);
        }
      },
    );
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

  async updatePackage(gigId: string, createPackageDTO: createPackageDTO) {
    const gig = await this.gigService.findOneById(gigId);
    if (!gig) {
      throw new Error(`Gig with id ${gigId} not found`);
    }
    return await this.packageRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const updatePackageFeatures = async (
            packageType: 'basic' | 'standard' | 'premium',
            newFeatures: { [key: string]: string },
          ) => {
            const existingPackage = await this.findOneByPackageTypeAndGigId(
              packageType,
              gigId,
            );

            if (!existingPackage) {
              throw new Error(
                `Package of type ${packageType} not found for gig ${gigId}`,
              );
            }

            let featuresToUpdate = [];
            for (const featureId in newFeatures) {
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

            if (featuresToUpdate.length > 0) {
              await transactionalEntityManager.save(featuresToUpdate);
            }
          };

          await updatePackageFeatures('basic', createPackageDTO.basic);
          await updatePackageFeatures('standard', createPackageDTO.standard);
          await updatePackageFeatures('premium', createPackageDTO.premium);

          return this.findOneByGigId(gigId);
        } catch (error) {
          throw new Error('Transaction failed: ' + error.message);
        }
      },
    );
  }
}
