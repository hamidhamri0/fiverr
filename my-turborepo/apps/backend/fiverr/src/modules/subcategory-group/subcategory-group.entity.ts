import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Category } from 'types/category';

@Entity('subcategory_groups')
export class SubcategoryGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  picture: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.group, {
    cascade: true,
  })
  subcategories: Subcategory[];

  @ManyToOne(() => Category, (category) => category.subcategoryGroups, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  category: Category;
}
