import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { UserLanguageModule } from './modules/user-language/user-language.module';
import { CategoryController } from './modules/category/category.controller';
import { CategoryModule } from './modules/category/category.module';
import { SubcategoryController } from './modules/subcategory/subcategory.controller';
import { SubcategoryService } from './modules/subcategory/subcategory.service';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { ServiceModule } from './modules/service/service.module';
import { TagController } from './modules/tag/tag.controller';
import { TagService } from './modules/tag/tag.service';
import { TagModule } from './modules/tag/tag.module';

import { PackageController } from './modules/package/package.controller';
import { PackageService } from './modules/package/package.service';
import { PackageModule } from './modules/package/package.module';
import { PackageFeatureModule } from './modules/package-feature/package-feature.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { CategoryService } from './modules/category/category.service';
import { MetadataModule } from './modules/metadata/metadata.module';
import { MetadataTagModule } from './modules/metadata-tag/metadata-tag.module';
import { FeatureModule } from './modules/feature/feature.module';
import { FeatureOptionModule } from './modules/feature-option/feature-option.module';
import { GigModule } from './modules/gig/gig.module';
import { CommandModule } from 'nestjs-command';
import { SeedCommand } from './seeds/seedCommand';
import { DatabaseSeeder } from './seeds/seed.service';
import { SeederModule } from './seeds/seed.module';
import { FaqModule } from './modules/faq/faq.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/GlobalExceptionFilter';
import { QuestionModule } from './modules/question/question.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { TwilioModule } from './modules/twilio/twilio.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { PhoneVerificationModule } from './modules/phone-verification/phone-verification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Hamid2012',
      database: 'fiverr',
      autoLoadEntities: true,
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule,
    PhoneVerificationModule,
    TwilioModule,
    PassportModule.register({ session: true }),
    FaqModule,
    SeederModule,
    CommandModule,
    UserModule,
    UserLanguageModule,
    CategoryModule,
    SubcategoryModule,
    ServiceModule,
    MetadataModule,
    MetadataTagModule,
    TagModule,
    FeatureModule,
    FeatureOptionModule,
    GigModule,
    PackageModule,
    PackageFeatureModule,
    AuthModule,
    QuestionModule,
    CloudinaryModule,
    TwilioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SeedCommand,
    DatabaseSeeder,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}