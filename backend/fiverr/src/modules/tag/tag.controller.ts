import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { ParseIdPipe } from 'src/common/pipes/parse-id.pipe';
import { NameValidationPipe } from 'src/common/pipes/name-validation.pipe';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/getAllTags')
  async getAllTags() {
    return this.tagService.getAllTags();
  }

  @Get('/getOneById')
  async findOneById(@Query('id', ParseIdPipe) id: number) {
    return this.tagService.findOneById(id);
  }

  @Get('/getOneByName')
  async findOneByName(@Query('name') name: string) {
    return this.tagService.findOneByName(name);
  }

  @Post('/createTag')
  async createTag(@Query('name', NameValidationPipe) name: string) {
    return this.tagService.createTag(name);
  }

  @Patch('/updateTag')
  async updateTag(
    @Query('id', ParseIdPipe) id: number,
    @Body('name', NameValidationPipe) name: string,
  ) {
    return this.tagService.updateTag(id, name);
  }

  @Delete('/deleteTag')
  async deleteTag(@Query('id', ParseIdPipe) id: number) {
    return this.tagService.deleteTag(id);
  }
}
