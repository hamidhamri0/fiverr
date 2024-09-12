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

@Entity('gigs')
export class Gig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('jsonb')
  aboutGig: string;

  @Column('text')
  description: string;

  @Column('boolean', { default: false })
  isPublished: boolean;

  @Column('numeric', { default: 2 })
  step: number;

  @ManyToOne(() => User, (user) => user.gigs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Service, (service) => service.gigs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'serviceId' })
  service: Service;

  @ManyToMany(() => Tag, (tag) => tag.gigs)
  @JoinTable({
    name: 'gig_tags',
    joinColumn: { name: 'gigId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @OneToMany(() => Package, (package_) => package_.gig)
  packages: Package[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
