import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

export enum Proficiency {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  NATIVE = 'native',
}

@Entity('user_languages')
export class UserLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  language: string;

  @Column({ nullable: false, type: 'enum', enum: Proficiency })
  proficiency: Proficiency;

  @ManyToOne(() => User, (user) => user.languages, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: User;
}
