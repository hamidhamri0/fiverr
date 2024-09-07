import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Service } from '../service/service.entity';
import { MetadataTag } from '../metadata-tag/metadata-tag.entity';

@Entity('metadata')
export class Metadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['multi_select', 'select'],
  })
  type: 'multi_select' | 'select';

  @ManyToOne(() => Service, (service) => service.metadata, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @OneToMany(() => MetadataTag, (metadataTag) => metadataTag.metadata)
  metadataTags: MetadataTag[];
}
