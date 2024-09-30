import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Gig } from '../gig/gig.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories?: Subcategory[];

  @OneToMany(() => Gig, (gig) => gig.category)
  gigs: Gig[];
}

/*

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories?: Subcategory[];
}

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

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.services, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subcategoryId' })
  subcategory: Subcategory;

  @OneToMany(() => Metadata, (metadata) => metadata.service)
  metadata: Metadata[];

  @OneToMany(() => Gig, (gig) => gig.service)
  gigs: Gig[];
}

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
  @JoinColumn({ name: 'serviceId' })
  service: Service;

  @OneToMany(() => MetadataTag, (metadataTag) => metadataTag.metadata)
  metadataTags: MetadataTag[];
}

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

*/
