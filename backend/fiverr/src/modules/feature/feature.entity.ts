import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Subcategory } from '../subcategory/subcategory.entity';
import { FeatureOption } from '../feature-option/feature-option.entity';
import { PackageFeature } from '../package-feature/package-feature.entity';

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['checkbox', 'select', 'range', 'input'],
  })
  type: 'checkbox' | 'select' | 'range' | 'input';

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.features, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subcategoryId' })
  subcategory: Subcategory;

  @OneToMany(() => FeatureOption, (featureOption) => featureOption.feature)
  options: FeatureOption[];

  @OneToMany(() => PackageFeature, (packageFeature) => packageFeature.feature)
  packageFeatures: PackageFeature[];
}
