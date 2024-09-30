import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Gig } from '../gig/gig.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Gig, (gig) => gig.tags, {
    onDelete: 'CASCADE',
  })
  gigs: Gig[];
}
