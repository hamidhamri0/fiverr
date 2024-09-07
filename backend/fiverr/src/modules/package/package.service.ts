import { Injectable } from '@nestjs/common';
import { Package } from './package.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  async getAllPackages() {
    return this.packageRepository.find();
  }

  async findOneById(id: number) {
    return this.packageRepository.findOne({ where: { id } });
  }
}
