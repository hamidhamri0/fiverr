import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Gig } from '../gig/gig.entity';

@Entity('faq')
export class FAQ {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  question: string;

  @Column('text')
  answer: string;

  @Column('integer')
  position: number;

  @ManyToOne(() => Gig, (gig) => gig.faqs, {
    onDelete: 'CASCADE',
  })
  gig: Gig;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
