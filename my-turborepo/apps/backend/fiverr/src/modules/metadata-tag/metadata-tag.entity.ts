import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Metadata } from '../metadata/metadata.entity';
import { Gig } from '../gig/gig.entity';

@Entity('metadata_tags')
export class MetadataTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Metadata, (metadata) => metadata.metadataTags, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'metadataId' })
  metadata: Metadata;
  @ManyToMany(() => Gig, (gig) => gig.metadataTags)
  gigs: Gig[];
}
