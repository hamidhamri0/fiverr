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
  VirtualColumn,
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
import { Question } from '../question/question.entity';
import { GigReviews } from '@modules/gig-reviews/gig-reviews.entity';
import { GigWithAvgRatingAndTotalReviews } from 'types/gig';

export enum GigStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  DENIED = 'denied',
  PAUSED = 'paused',
  DRAFT = 'draft',
}

@Entity('gigs')
export class Gig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('jsonb', {
    nullable: true,
  })
  aboutGig?: object;

  @Column('boolean', { default: false })
  isPublished?: boolean;

  @Column('numeric', { default: 2 })
  step?: number;

  @ManyToOne(() => User, (user) => user.gigs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToOne(() => Category, (category) => category.gigs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category?: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.gigs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subcategoryId' })
  subcategory?: Subcategory;

  @ManyToOne(() => Service, (service) => service.gigs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'serviceId' })
  service?: Service;

  @Column('jsonb', {
    default:
      '["https://res.cloudinary.com/dnnaq2dbk/image/upload/v1727869983/default-product-img_cj4wcq.jpg"]',
  })
  imageUrls: string[];

  @Column('jsonb', { default: '{}' })
  videoUrl: { videoUrl: string; thumbnail: string };

  @Column('jsonb', { default: '[]' })
  pdfUrls: string[];

  @Column('numeric', { default: 0 })
  clicks: number;

  @Column('numeric', { default: 0 })
  impressions: number;

  @Column('numeric', { default: 0 })
  orders: number;

  @Column('numeric', { default: 0 })
  cancellations: number;

  @Column({
    type: 'enum',
    enum: GigStatus,
    default: GigStatus.DRAFT,
  })
  status: GigStatus;

  @OneToMany(() => GigReviews, (GigReviews) => GigReviews.gig)
  reviews?: GigReviews[];

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
  metadata?: Metadata[];

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
  metadataTags?: MetadataTag[];

  @ManyToMany(() => Tag, (tag) => tag.gigs)
  @JoinTable({
    name: 'gig_tags',
    joinColumn: { name: 'gigId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags?: Tag[];

  @OneToMany(() => Package, (package_) => package_.gig, {
    cascade: true,
  })
  packages?: Package[];

  @OneToMany(() => FAQ, (faq) => faq.gig, {
    cascade: true,
  })
  faqs: FAQ[];

  @OneToMany(() => Question, (question) => question.gig, {
    cascade: true,
  })
  questions?: Question[];

  @VirtualColumn({
    query: () => '',
    type: 'numeric',
  })
  totalReviews?: number;

  @VirtualColumn({
    query: () => '',
    type: 'numeric',
  })
  startingPrice?: number;

  @VirtualColumn({
    query: () => '',
    type: 'numeric',
  })
  averageRating?: number;

  @VirtualColumn({
    query: () => '',
    type: 'jsonb',
  })
  reviewsChart?: { rating: number; totalReviews: number }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

type Q =
  | 'category'
  | 'user'
  | 'subcategory'
  | 'metadata'
  | 'metadataTags'
  | 'faqs'
  | 'service'
  | 'features'
  | 'tags'
  | 'packages'
  | 'questions'
  | 'packageFeatures'
  | 'reviews'
  | 'userLanguages'
  | 'startingPrice'
  | 'userRating'
  | 'reviewsChart';

export type Query = Q[];

export type userFeedGigs = {
  [key: string]: GigWithAvgRatingAndTotalReviews[];
};
