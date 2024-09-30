import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { ParseIdPipe } from 'src/common/pipes/parse-id.pipe';
import { CreateServiceDTO } from './DTO/create-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('/getAllServices')
  async getAllServices() {
    return this.serviceService.getAllServices();
  }

  @Get('/getOneById')
  async findOneById(@Query('id', ParseIdPipe) id: number) {
    return this.serviceService.findOneById(id);
  }

  @Get('/getOneByName')
  async findOneByName(@Query('name') name: string) {
    return this.serviceService.findOneByName(name);
  }

  @Post('/createService')
  async createService(@Body() CreateServiceDTO: CreateServiceDTO) {
    return this.serviceService.createService(CreateServiceDTO);
  }

  @Delete('/deleteService')
  async deleteService(@Query('id', ParseIdPipe) id: number) {
    return this.serviceService.deleteService(id);
  }

  @Patch('/updateService')
  async updateService(
    @Query('id', ParseIdPipe) id: number,
    @Body() service: CreateServiceDTO,
  ) {
    return this.serviceService.updateService(id, service);
  }

  @Get('/getServicesBySubcategoryId')
  async getServicesBySubcategoryId(
    @Query('subcategoryId', ParseIdPipe) subcategoryId: number,
  ) {
    return this.serviceService.getServicesBySubcategoryId(subcategoryId);
  }

  @Get('/getServicesBySubcategoryName')
  async getServicesBySubcategoryName(@Query('name') name: string) {
    return this.serviceService.getServicesBySubcategoryName(name);
  }
}
