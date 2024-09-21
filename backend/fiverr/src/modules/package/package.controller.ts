import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Get,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { createPackageDTO } from './DTO/createPackageDto';
import { updatePackageDTO } from './DTO/updatePackageDto';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get('/getPackageById/:id')
  async getPackageById(@Param('id') id: number) {
    return this.packageService.findOneById(id);
  }

  @Get('/getPackageByGigId/:gigId')
  async getPackageByGigId(@Param('gigId', new ParseUUIDPipe()) id: string) {
    return this.packageService.findOneByGigId(id);
  }

  @Post('/createPackage/:gigId')
  async createPackage(
    @Param('gigId', new ParseUUIDPipe()) gigId: string,
    @Body() createPackageDTO: createPackageDTO,
  ) {
    return this.packageService.createPackage(gigId, createPackageDTO);
  }

  @Post('/updatePackage/:gigId')
  async updatePackage(
    @Param('gigId', new ParseUUIDPipe()) gigId: string,
    @Body() updatePackageDTO: updatePackageDTO,
  ) {
    return this.packageService.updatePackage(gigId, updatePackageDTO);
  }
}
