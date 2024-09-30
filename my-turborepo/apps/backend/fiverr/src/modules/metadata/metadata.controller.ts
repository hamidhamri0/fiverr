import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { ParseIdPipe } from 'src/common/pipes/parse-id.pipe';
import { CreateMetadataDTO } from './DTO/create-metadata.dto';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('/getAllMetadata')
  async getAllMetadata() {
    return this.metadataService.getAllMetadata();
  }

  @Get('/getOneById')
  async findOneById(@Query('id', ParseIdPipe) id: number) {
    return this.metadataService.findOneById(id);
  }

  @Get('/getMetadataByServiceId')
  async getMetadataByServiceId(
    @Query('serviceId', ParseIdPipe) serviceId: number,
  ) {
    return this.metadataService.getMetadataByServiceId(serviceId);
  }

  @Get('/getMetadataByServiceIdAndTheirTags')
  async getMetadataByServiceIdAndGetMetadataTagsByMetadataId(
    @Query('serviceId', ParseIdPipe) serviceId: number,
  ) {
    return this.metadataService.getMetadataByServiceIdAndTheirTags(serviceId);
  }

  @Get('/getMetadataByServiceName')
  async getMetadataByServiceName(@Query('name') name: string) {
    return this.metadataService.getMetadataByServiceName(name);
  }

  @Post('/createMetadata')
  async createMetadata(@Body() metadata: CreateMetadataDTO) {
    return this.metadataService.createMetadata(metadata);
  }

  @Delete('/deleteMetadata')
  async deleteMetadata(@Query('id', ParseIdPipe) id: number) {
    return this.metadataService.deleteMetadata(id);
  }

  @Patch('/updateMetadata')
  async updateMetadata(
    @Query('id', ParseIdPipe) id: number,
    @Body() metadata: CreateMetadataDTO,
  ) {
    return this.metadataService.updateMetadata(id, metadata);
  }
}
