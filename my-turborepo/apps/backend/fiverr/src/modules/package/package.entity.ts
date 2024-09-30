import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Gig } from '../gig/gig.entity';
import { PackageFeature } from '../package-feature/package-feature.entity';

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['basic', 'standard', 'premium'],
  })
  type: 'basic' | 'standard' | 'premium';

  @ManyToOne(() => Gig, (gig) => gig.packages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'gigId' })
  gig: Gig;

  @OneToMany(() => PackageFeature, (packageFeature) => packageFeature.package, {
    cascade: true,
  })
  packageFeatures: PackageFeature[];
}
