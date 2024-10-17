import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { User } from 'src/modules/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { SessionSerializer } from './utils/session-serializer';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalGuard } from './guards/local.guard';
import { GigModule } from '@modules/gig/gig.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    UserModule,
    GigModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    GoogleStrategy,
    LocalGuard,
    LocalStrategy,
    SessionSerializer,
    AuthService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
