import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
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

  @Column({ default: true })
  isIncluded: boolean;

  @ManyToOne(() => Package, (package_) => package_.packageFeatures)
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @ManyToOne(() => Feature, (feature) => feature.packageFeatures)
  @JoinColumn({ name: 'featureId' })
  feature: Feature;
}
