import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Service } from '../service/service.entity';
import { Feature } from '../feature/feature.entity';
import { Gig } from '../gig/gig.entity';
import { SubcategoryGroup } from '@modules/subcategory-group/subcategory-group.entity';

@Entity('subcategories')
@Unique(['name', 'category'])
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => SubcategoryGroup, (group) => group.subcategories, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  group: SubcategoryGroup;

  @OneToMany(() => Service, (service) => service.subcategory)
  services: Service[];

  @OneToMany(() => Feature, (feature) => feature.subcategory)
  features: Feature[];

  @OneToMany(() => Gig, (gig) => gig.subcategory)
  gigs: Gig[];
}
