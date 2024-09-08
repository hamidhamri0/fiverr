import { Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { ParseIdPipe } from 'src/common/pipes/parse-id.pipe';
import { CreateFeatureDTO } from './DTO/create-feature.dto';

@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Get('/getAllFeatures')
  async getAllFeatures() {
    return this.featureService.getAllFeatures();
  }

  @Get('/getOneById')
  async findOneById(@Query('id', ParseIdPipe) id: number) {
    return this.featureService.findOneById(id);
  }

  @Get('/getOneByName')
  async findOneByName(@Query('name') name: string) {
    return this.featureService.findOneByName(name);
  }

  @Get('/getAllFeaturesBySubcategoryId')
  async getAllFeaturesBySubcategoryId(
    @Query('subcategoryId', ParseIdPipe) subcategoryId: number,
  ) {
    return this.featureService.getAllFeaturesBySubcategoryId(subcategoryId);
  }

  @Post('/createFeature')
  async createFeature(
    @Query('subcategoryId', ParseIdPipe) subcategoryId: number,
    createFeatureDTO: CreateFeatureDTO,
  ) {
    return this.featureService.createFeature(subcategoryId, createFeatureDTO);
  }

  @Patch('/updateFeature')
  async updateFeature(
    @Query('id', ParseIdPipe) id: number,
    @Query() feature: CreateFeatureDTO,
  ) {
    return this.featureService.updateFeature(id, feature);
  }

  @Delete('/deleteFeature')
  async deleteFeature(@Query('id', ParseIdPipe) id: number) {
    return this.featureService.deleteFeature(id);
  }
}
