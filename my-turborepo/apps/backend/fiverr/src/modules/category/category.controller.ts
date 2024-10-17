import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './DTO/create-category-dto';
import { ParseIdPipe } from 'src/common/pipes/parse-id.pipe';
// import { LoggedUserGuard } from 'src/common/guards/logged-user.guard';

@Controller('category')
// @UseGuards(new LoggedUserGuard())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/getAllCategories')
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('/getOneById')
  async findOneById(@Query('id', ParseIdPipe) id: number) {
    return this.categoryService.findOneById(id);
  }

  @Get('/getCategoryWithSubCategoryGroupsByCategoryName')
  async getCategoryWithSubCategoryGroupsByCategoryName(
    @Query('category') slug: string,
  ) {
    console.log(slug);

    return this.categoryService.getCategoryWithSubCategoryGroupsByCategoryName(
      slug,
    );
  }

  @Get('/getOneByName')
  async findOneByName(@Query('name') name: string) {
    return this.categoryService.findOneByName(name);
  }

  @Post('/createCategory')
  async createCategory(@Body() category: CreateCategoryDTO) {
    return this.categoryService.createCategory(category);
  }

  @Delete('/deleteCategory')
  async deleteCategory(@Query('id', ParseIdPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
