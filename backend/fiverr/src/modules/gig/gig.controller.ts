import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GigService } from './gig.service';
import { GigDTO } from './DTO/gig.dto';
import { Gig, GigStatus } from './gig.entity';
import { SaveGigWithPackagesDTO } from './DTO/save-gig-with-packages.dto';
// import { UpdateGigDTO } from './DTO/update-gig-dto';

@Controller('gig')
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @Post('/saveGig')
  async saveGig(
    @Query('gigId') gigId: string,
    @Body() gigDto: GigDTO,
  ): Promise<Gig> {
    console.log('controller', gigDto);
    try {
      return await this.gigService.saveGig(gigId, gigDto);
    } catch (e) {
      console.log('error', e);
      throw new HttpException('Gig not created', 404);
    }
  }

  @Post('/saveGigWithPackages')
  async saveGigWithPackages(
    @Query('gigId') gigId: string,
    @Body() gigDto: SaveGigWithPackagesDTO,
  ): Promise<Gig> {
    try {
      return await this.gigService.saveGigWithPackages(gigId, gigDto);
    } catch (e) {
      console.log('error', e);
      throw new HttpException('Gig not created', 404);
    }
  }

  @Post('/publish/:gigId')
  async publishGig(@Param('gigId') gigId: string): Promise<Gig> {
    try {
      return this.gigService.makeGigPublic(gigId);
    } catch (e) {
      throw new HttpException(e.message, 404);
    }
  }

  @Get('getAllGigs')
  async getAllGigs(): Promise<Gig[]> {
    return await this.gigService.getAllGigs();
  }

  @Get('getOneById/:id')
  async getGig(@Param('id') id: string): Promise<Gig> {
    try {
      return this.gigService.getGigWithAllRelations(id);
    } catch (err) {
      console.log('first error', err);
      throw new HttpException('Gig not found', 404);
    }
  }
  @Get('getAllGigsByUserId/:userId')
  async getAllGigsByUserId(
    @Param('userId') id: string,
    @Query('status') status: GigStatus,
  ): Promise<Gig[]> {
    return await this.gigService.getAllGigsByUserId(id, status);
  }
  @Post('deleteGig')
  async deleteGig(@Body('gigIds') gigIds: string[]) {
    return this.gigService.deleteGig(gigIds);
  }

  @Post('pauseGig/:gigId')
  async pauseGig(@Param('gigId') id: string) {
    return this.gigService.pauseGig(id);
  }
}
