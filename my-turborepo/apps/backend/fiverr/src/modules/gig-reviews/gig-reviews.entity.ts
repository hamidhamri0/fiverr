import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Check,
  VirtualColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Gig } from '../gig/gig.entity';

@Entity('gig_reviews')
export class GigReviews {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  @Check(`"rating" >= 0 AND "rating" <= 5`)
  rating: number;

  @Column('text')
  review: string;

  @ManyToOne(() => User, (user) => user.gigReviews, {
    nullable: false,
    onDelete: 'CASCADE', // When the user is deleted, ratings should be deleted too
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Gig, (gig) => gig.reviews, {
    nullable: false,
    onDelete: 'CASCADE', // When the gig is deleted, ratings should be deleted too
  })
  @JoinColumn({ name: 'gigId' })
  gig: Gig;

  @VirtualColumn({
    query: () => '',
    type: 'boolean',
  })
  next: boolean;

  @CreateDateColumn()
  createdAt: Date;
  1;

  @UpdateDateColumn()
  updatedAt: Date;
}
