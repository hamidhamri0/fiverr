import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToOne,
} from 'typeorm';
import { Package } from '../package/package.entity';
import { Feature } from '../feature/feature.entity';

@Entity('package_features')
export class PackageFeature {
  @PrimaryColumn()
  packageId: number;

  @PrimaryColumn()
  featureId: number;

  @Column({ nullable: false })
  value: string;

  @ManyToOne(() => Package, (package_) => package_.packageFeatures, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @OneToOne(() => Feature)
  @JoinColumn()
  feature: Feature;
}
