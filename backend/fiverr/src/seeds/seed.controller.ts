import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { DatabaseSeeder } from './seed.service';
@Controller('seed')
export class SeedController {
  constructor(private readonly databaseSeeder: DatabaseSeeder) {}
  @Get('/db')
  async seed() {
    this.databaseSeeder.seed();
    return 'DB Seeded';
  }
  @Get('/delete')
  async deleteDb() {
    this.databaseSeeder.deleteAll();
    return 'DB Seeded';
  }
}
