import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
  Check,
} from 'typeorm';
import { UserLanguage } from '../user-language/user-language.entity';
import { Gig } from '../gig/gig.entity';
import { PhoneVerification } from '../phone-verification/phone-verification.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string; // Make password optional

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  emailVerificationCode?: string;

  @Column({ nullable: true, default: false })
  isVerifiedPhoneNumber?: boolean;

  @Column({ nullable: true, default: false })
  isVerifiedEmail?: boolean;

  @Column({ unique: true, nullable: true })
  username?: string;

  @Column({ unique: true, nullable: true })
  description: string;

  @Column({ nullable: true })
  picture?: string;

  @Column({ default: true })
  isNew?: boolean;

  @Column({ nullable: true, unique: true })
  googleId?: string; // Add field for Google ID

  @Column({ nullable: true, unique: true })
  appleId?: string; // Add field for Apple ID

  @Column({ nullable: true, unique: true })
  facebookId?: string; // Add field for Facebook ID

  @Check(`"preferredStartDay" >= 0`)
  @Column({ nullable: true })
  preferredStartDay?: number;

  @Check(`"preferredEndDay" >= 0`)
  @Column({ nullable: true })
  preferredEndDay?: number;

  @Column({ nullable: true })
  preferredStartTime?: string;

  @Column({ nullable: true })
  preferredEndTime?: string;

  @Column({ nullable: true })
  timezone: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToMany(() => UserLanguage, (userLanguage) => userLanguage.user)
  @JoinTable({
    name: 'user_languages_users',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userLanguageId',
      referencedColumnName: 'id',
    },
  })
  languages?: UserLanguage[];

  @OneToMany(() => Gig, (gig) => gig.user)
  gigs?: Gig[];

  @OneToMany(
    () => PhoneVerification,
    (phoneVerification) => phoneVerification.user,
  )
  phoneVerifications: PhoneVerification[];
}
