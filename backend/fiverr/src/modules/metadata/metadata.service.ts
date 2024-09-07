import { Injectable, NotFoundException } from '@nestjs/common';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { ServiceService } from '../service/service.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Metadata } from './metadata.entity';
import { CreateMetadataDTO } from './DTO/create-metadata.dto';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Metadata)
    private readonly metadataRepository: Repository<Metadata>,
    private readonly serviceService: ServiceService,
  ) {}

  async getAllMetadata() {
    return this.metadataRepository.find();
  }

  async findOneById(id: number) {
    return this.metadataRepository.findOne({ where: { id } });
  }

  async findOneByServiceId(id: number) {
    return this.metadataRepository.findOne({ where: { id } });
  }

  async createMetadata(metadata: CreateMetadataDTO) {
    // Fetch the Service entity using the serviceId from the DTO
    const service = await this.serviceService.findOneById(metadata.serviceId);
    if (!service) {
      throw new NotFoundException(
        `Service with ID ${metadata.serviceId} not found`,
      );
    }
    // Create a new Metadata entity and set the service relationship
    let newMetadata = this.metadataRepository.create({
      ...metadata,
      service: service,
    });
    return this.metadataRepository.save(newMetadata);
  }

  async deleteAllMetadata() {
    return this.metadataRepository.delete({});
  }

  async deleteMetadata(id: number) {
    return this.metadataRepository.delete({ id });
  }

  async updateMetadata(id: number, metadata: CreateMetadataDTO) {
    return this.metadataRepository.update({ id }, metadata);
  }

  async getMetadataByServiceId(serviceId: number) {
    return this.metadataRepository.find({
      where: { service: { id: serviceId } },
    });
  }

  async getMetadataByServiceIdAndTheirTags(serviceId: number) {
    return this.metadataRepository.find({
      where: { service: { id: serviceId } },
      relations: ['metadataTags'],
    });
  }

  async getMetadataByServiceName(serviceName: string) {
    return this.metadataRepository.find({
      where: { service: { name: serviceName } },
    });
  }
}
