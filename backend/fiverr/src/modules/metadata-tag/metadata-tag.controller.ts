import { Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { MetadataTagService } from './metadata-tag.service';
import { ParseIdPipe } from 'src/common/pipes/parse-id.pipe';
import { CreateMetadataTagDTO } from './DTO/create-metadata-tag-dto';

@Controller('metadata-tag')
export class MetadataTagController {
  constructor(private readonly metadataTagService: MetadataTagService) {}

  @Get('/getAllMetadataTags')
  async getAllMetadataTags() {
    return this.metadataTagService.getAllMetadataTags();
  }

  @Get('/getOneById')
  async findOneById(@Query('id', ParseIdPipe) id: number) {
    return this.metadataTagService.findOneById(id);
  }

  @Get('/getOneByName')
  async findOneByName(@Query('name') name: string) {
    return this.metadataTagService.findOneByName(name);
  }

  @Post('/createMetadataTag')
  async createMetadataTag(@Query('name') metadataTag: CreateMetadataTagDTO) {
    return this.metadataTagService.createMetadataTag(metadataTag);
  }

  @Patch('/updateMetadataTag')
  async updateMetadataTag(
    @Query('id', ParseIdPipe) id: number,
    @Query() metadaataTag: CreateMetadataTagDTO,
  ) {
    return this.metadataTagService.updateMetadataTag(id, metadaataTag);
  }

  @Delete('/deleteMetadataTag')
  async deleteMetadataTag(@Query('id', ParseIdPipe) id: number) {
    return this.metadataTagService.deleteMetadataTag(id);
  }
}
