import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { ILike, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getAllTags() {
    return this.tagRepository.find();
  }

  async findOneById(id: number) {
    return this.tagRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return this.tagRepository.find({ where: { name: ILike(`%${name}%`) } });
  }

  async createTag(tag: string) {
    let newTag = this.tagRepository.create({
      name: tag,
    });
    return this.tagRepository.save(newTag);
  }

  async deleteTag(id: number) {
    return this.tagRepository.delete({ id });
  }

  async deleteAllTags() {
    return this.tagRepository.delete({});
  }

  async updateTag(id: number, tag: string) {
    return this.tagRepository.update({ id }, { name: tag });
  }
}
