import { Injectable, NotFoundException } from '@nestjs/common';
import { Service } from './service.entity';
import { Repository } from 'typeorm';
import { SubcategoryService } from '../subcategory/subcategory.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServiceDTO } from './DTO/create-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly subcategoryService: SubcategoryService,
  ) {}

  async getAllServices() {
    return this.serviceRepository.find();
  }

  async findOneById(id: number) {
    return this.serviceRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return this.serviceRepository.findOne({ where: { name } });
  }

  async createService(service: CreateServiceDTO) {
    // Fetch the Subcategory entity using the subcategoryId from the DTO
    const subcategory = await this.subcategoryService.findOneById(
      service.subcategoryId,
    );
    if (!subcategory) {
      throw new NotFoundException(
        `Subcategory with ID ${service.subcategoryId} not found`,
      );
    }
    // Create a new Service entity and set the subcategory relationship
    let newService = this.serviceRepository.create({
      ...service,
      subcategory: subcategory,
    });
    // Save the new Service entity to the database
    return this.serviceRepository.save(newService);
  }

  async deleteService(id: number) {
    return this.serviceRepository.delete({ id });
  }

  async updateService(id: number, service: CreateServiceDTO) {
    return this.serviceRepository.update({ id }, service);
  }

  async getServicesBySubcategoryId(subcategoryId: number) {
    return this.serviceRepository.find({
      where: { subcategory: { id: subcategoryId } },
    });
  }

  async deleteAllServices() {
    return this.serviceRepository.delete({});
  }

  async getServicesBySubcategoryName(subcategoryName: string) {
    return this.serviceRepository.find({
      where: { subcategory: { name: subcategoryName } },
    });
  }
}
