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

@Entity('subcategories')
@Unique(['name', 'category'])
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Service, (service) => service.subcategory)
  services: Service[];

  @OneToMany(() => Feature, (feature) => feature.subcategory)
  features: Feature[];
}
