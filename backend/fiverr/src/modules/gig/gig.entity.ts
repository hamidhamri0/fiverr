import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Service } from '../service/service.entity';
import { Tag } from '../tag/tag.entity';
import { Package } from '../package/package.entity';
import { Category } from '../category/category.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Metadata } from '../metadata/metadata.entity';
import { MetadataTag } from '../metadata-tag/metadata-tag.entity';
import { FAQ } from '../faq/faq.entity';

@Entity('gigs')
export class Gig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('jsonb', {
    nullable: true,
  })
  aboutGig?: string;

  @Column('text', {
    nullable: true,
  })
  description?: string;

  @Column('boolean', { default: false })
  isPublished?: boolean;

  @Column('numeric', { default: 2 })
  step?: number;

  @ManyToOne(() => User, (user) => user.gigs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Category, (category) => category.gigs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.gigs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subcategoryId' })
  subcategory: Subcategory;

  @ManyToOne(() => Service, (service) => service.gigs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'serviceId' })
  service: Service;

  @ManyToMany(() => Metadata)
  @JoinTable({
    name: 'gig_metadata',
    joinColumn: {
      name: 'gigId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'metadataId',
      referencedColumnName: 'id',
    },
  })
  metadata: Metadata[];

  @ManyToMany(() => MetadataTag)
  @JoinTable({
    name: 'gig_metadata_tags',
    joinColumn: {
      name: 'gigId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'metadataTagId',
      referencedColumnName: 'id',
    },
  })
  metadataTags: MetadataTag[];

  @ManyToMany(() => Tag, (tag) => tag.gigs)
  @JoinTable({
    name: 'gig_tags',
    joinColumn: { name: 'gigId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @OneToMany(() => Package, (package_) => package_.gig, {
    cascade: true,
  })
  packages: Package[];

  @OneToMany(() => FAQ, (faq) => faq.gig, {
    cascade: true,
  })
  faqs: FAQ[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
