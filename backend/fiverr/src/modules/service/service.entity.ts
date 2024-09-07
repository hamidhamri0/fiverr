import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Metadata } from '../metadata/metadata.entity';
import { Gig } from '../gig/gig.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.services, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subcategoryId' })
  subcategory: Subcategory;

  @OneToMany(() => Metadata, (metadata) => metadata.service)
  metadata: Metadata[];

  @OneToMany(() => Gig, (gig) => gig.service)
  gigs: Gig[];
}
