import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Metadata } from '../metadata/metadata.entity';

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
}
