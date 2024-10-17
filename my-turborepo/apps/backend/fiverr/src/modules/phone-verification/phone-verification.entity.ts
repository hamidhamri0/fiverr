import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('phone_verifications')
export class PhoneVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  phoneNumber: string;

  @Column()
  verificationCode: string;

  @Column()
  createdAt: Date;

  @Column()
  expiresAt: Date;
}
