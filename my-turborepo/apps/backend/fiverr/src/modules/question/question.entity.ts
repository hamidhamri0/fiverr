import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Gig } from '../gig/gig.entity';

type Type = {
  genre: string;
  multiple: boolean;
};

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'question',
  })
  question: string;

  @Column('jsonb')
  options: string[];

  @Column('jsonb')
  type: Type;

  @ManyToOne(() => Gig, (gig) => gig.questions, {
    onDelete: 'CASCADE',
  })
  gig: Gig;
}
