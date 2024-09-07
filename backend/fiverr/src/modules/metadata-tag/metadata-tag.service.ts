import { Injectable, NotFoundException } from '@nestjs/common';
import { MetadataTag } from './metadata-tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MetadataService } from '../metadata/metadata.service';
import { CreateMetadataTagDTO } from './DTO/create-metadata-tag-dto';

@Injectable()
export class MetadataTagService {
  constructor(
    @InjectRepository(MetadataTag)
    private readonly metadataTagRepository: Repository<MetadataTag>,
    private readonly metadataService: MetadataService,
  ) {}

  async getAllMetadataTags() {
    return this.metadataTagRepository.find();
  }

  async findOneById(id: number) {
    return this.metadataTagRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return this.metadataTagRepository.findOne({ where: { name } });
  }

  async deleteAllMetadataTag() {
    return this.metadataTagRepository.delete({});
  }

  async createMetadataTag(metadataTag: CreateMetadataTagDTO) {
    // Fetch the Metadata entity using the metadataId from the DTO
    const metadata = await this.metadataService.findOneById(
      metadataTag.metadataId,
    );
    if (!metadata) {
      throw new NotFoundException(
        `Metadata with ID ${metadataTag.metadataId} not found`,
      );
    }
    // Create a new MetadataTag entity and set the metadata relationship
    let newMetadataTag = this.metadataTagRepository.create({
      ...metadataTag,
      metadata: metadata,
    });
    return this.metadataTagRepository.save(newMetadataTag);
  }

  async deleteMetadataTag(id: number) {
    return this.metadataTagRepository.delete({ id });
  }

  async updateMetadataTag(id: number, metadataTag: CreateMetadataTagDTO) {
    return this.metadataTagRepository.update({ id }, metadataTag);
  }
}
