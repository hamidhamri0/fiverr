import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigController } from './gig.controller';
import { Gig } from './gig.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gig]), ServiceModule],
  providers: [GigService],
  controllers: [GigController],
})
export class GigModule {}
