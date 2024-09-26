import { Injectable } from '@nestjs/common';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveQuestionDto, QuestionTypeGenre } from './DTO/create-question.dto';
import { Gig } from '../gig/gig.entity';
import { GigService } from '../gig/gig.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async getQuestionsByGigId(gigId: string) {
    return this.questionRepository.find({
      where: { gig: { id: gigId } },
    });
  }

  async getQuestionById(questionId: number) {
    return this.questionRepository.findOne({ where: { id: questionId } });
  }

  async saveQuestions(gigId: string, { question: questions }: SaveQuestionDto) {
    const createdQuestions = [];
    console.log(questions);
    const existingQuestions = await this.questionRepository.find({
      where: { gig: { id: gigId } },
    });
    console.log(existingQuestions);

    for (const question of existingQuestions) {
      if (!questions.some((q) => q.id === question.id)) {
        await this.questionRepository.remove({ id: question.id } as Question);
      }
    }

    console.log(existingQuestions);

    for (const question of questions) {
      if (question?.id) {
        const existingQuestion = await this.getQuestionById(question.id);
        existingQuestion.question = question.question;
        existingQuestion.options = question.options;
        existingQuestion.type = question.type;
        createdQuestions.push(existingQuestion);
        continue;
      } else {
        const newQuestion = new Question();
        newQuestion.question = question.question;
        newQuestion.options = question.options;
        newQuestion.type = question.type;
        newQuestion.gig = { id: gigId } as Gig;
        createdQuestions.push(newQuestion);
      }
    }

    return this.questionRepository.save(createdQuestions);
  }
}
