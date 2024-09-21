import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { SaveQuestionDto } from './DTO/create-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('/saveQuestions/:gigId')
  async createQuestion(
    @Param('gigId', new ParseUUIDPipe()) gigId: string,
    @Body() saveQuestionDto: SaveQuestionDto,
  ) {
    return this.questionService.saveQuestions(gigId, saveQuestionDto);
  }

  @Get('/getQuestions/:gigId')
  async getQuestionsByGigId(
    @Param('gigId', new ParseUUIDPipe()) gigId: string,
  ) {
    return this.questionService.getQuestionsByGigId(gigId);
  }
}
