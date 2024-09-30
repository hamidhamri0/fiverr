import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Feature } from '../feature/feature.entity';
import { BadRequestException } from '@nestjs/common';

@Entity('feature_options')
export class FeatureOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => Feature, (feature) => feature.options, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'featureId' })
  feature: Feature;

  @BeforeInsert()
  async validateFeatureType() {
    if (this.feature.type !== 'select') {
      throw new BadRequestException(
        'Feature type must be "select" to create a FeatureOption',
      );
    }
  }
}
