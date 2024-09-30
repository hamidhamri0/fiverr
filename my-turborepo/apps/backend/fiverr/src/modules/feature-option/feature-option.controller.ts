import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FeatureOptionService } from './feature-option.service';
import { ParseIdPipe } from 'src/common/pipes/parse-id.pipe';
import { NameValidationPipe } from 'src/common/pipes/name-validation.pipe';

@Controller('feature-option')
export class FeatureOptionController {
  constructor(private readonly featureOptionService: FeatureOptionService) {}

  @Get('/getAllFeatureOptions')
  async getAllFeatureOptions() {
    return this.featureOptionService.getAllFeatureOptions();
  }

  @Get('/getOneById')
  async findOneById(@Query('id', ParseIdPipe) id: number) {
    return this.featureOptionService.findOneById(id);
  }

  @Get('/getOneByName')
  async findOneByValue(@Query('value', NameValidationPipe) value: string) {
    return this.featureOptionService.findOneByValue(value);
  }

  @Post('/createFeatureOption')
  async createFeatureOption(
    @Query('featureId', ParseIdPipe) featureId: number,
    @Body('value', NameValidationPipe) value: string,
  ) {
    return this.featureOptionService.createFeatureOption(featureId, value);
  }

  @Patch('/updateFeatureOption')
  async updateFeatureOption(
    @Query('id', ParseIdPipe) id: number,
    @Body('value', NameValidationPipe) value: string,
  ) {
    return this.featureOptionService.updateFeatureOption(id, value);
  }

  @Delete('/deleteFeatureOption')
  async deleteFeatureOption(@Query('id', ParseIdPipe) id: number) {
    return this.featureOptionService.deleteFeatureOption(id);
  }
}
