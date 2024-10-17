import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDTO } from './DTO/create-subcategory.dto';
import { ParseIdPipe } from 'src/common/pipes/parse-id.pipe';
import { NameValidationPipe } from 'src/common/pipes/name-validation.pipe';
import { LoggedUserGuard } from 'src/common/guards/logged-user.guard';

@Controller('subcategory')
@UseGuards(new LoggedUserGuard())
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get('/getAllSubcategories')
  async getAllSubcategories() {
    return this.subcategoryService.getAllSubcategories();
  }

  @Get('/getOneById')
  async findOneById(@Query('id', ParseIdPipe) id: number) {
    return this.subcategoryService.findOneById(id);
  }

  @Get('/getOneByName')
  async findOneByName(@Query('name', NameValidationPipe) name: string) {
    return this.subcategoryService.findOneByName(name);
  }

  @Get('/getSubcategoriesByCategoryId')
  async getSubcategoriesByCategoryId(
    @Query('categoryId', ParseIdPipe) categoryId: number,
  ) {
    return this.subcategoryService.getAllSubcategoriesByCategoryId(categoryId);
  }

  @Post('/createSubcategory')
  async createSubcategory(
    @Query('categoryId', ParseIdPipe) categoryId: number,
    @Query('subcategoryGroupId', ParseIdPipe) subcategoryGroupId: number,
    @Body() subcategoryData: CreateSubcategoryDTO,
  ) {
    return this.subcategoryService.createSubcategory(
      categoryId,
      subcategoryGroupId,
      subcategoryData,
    );
  }

  @Delete('/deleteSubcategory')
  async deleteSubcategory(@Query('id', ParseIdPipe) id: number) {
    return this.subcategoryService.deleteSubcategory(id);
  }

  @Patch('/updateSubcategory')
  async updateSubcategory(
    @Query('id', ParseIdPipe) id: number,
    @Body() subcategory: CreateSubcategoryDTO,
  ) {
    return this.subcategoryService.updateSubcategory(id, subcategory);
  }
}
