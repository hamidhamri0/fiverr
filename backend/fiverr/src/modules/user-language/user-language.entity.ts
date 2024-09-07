import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('user_languages')
export class UserLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  language: string;

  @ManyToMany(() => User, (user) => user.languages)
  users: User[];
}
