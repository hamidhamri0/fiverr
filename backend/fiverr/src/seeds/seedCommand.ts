import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DatabaseSeeder } from './seed.service';

@Injectable()
export class SeedCommand {
  constructor(private readonly databaseSeeder: DatabaseSeeder) {}

  @Command({ command: 'seed', describe: 'Seed database' })
  async seed() {
    await this.databaseSeeder.seed();
    console.log('Database seeded!');
  }
}
