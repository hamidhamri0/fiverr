import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './service.entity';
import { SubcategoryModule } from '../subcategory/subcategory.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), SubcategoryModule],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
