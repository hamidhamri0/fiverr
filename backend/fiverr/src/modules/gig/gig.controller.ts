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
import { Gig } from './gig.entity';
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
      return this.gigService.saveGig(gigId, gigDto);
    } catch (e) {
      console.log('error', e);
      throw new HttpException('Gig not created', 404);
    }
  }

  // @Post('/updateGig/:id')
  // async updateGig(
  //   @Param('id', new ParseUUIDPipe()) id: string,
  //   @Body() updateGigDto: UpdateGigDTO,
  // ): Promise<Gig> {
  //   try {
  //     return this.gigService.updateGig(id, updateGigDto);
  //   } catch (e) {
  //     throw new HttpException(e.message, 404);
  //   }
  // }

  @Get('getOneById/:id')
  async getGig(@Param('id') id: string): Promise<Gig> {
    try {
      return this.gigService.getGigWithAllRelations(id);
    } catch (err) {
      console.log('first error', err);
      throw new HttpException('Gig not found', 404);
    }
  }
}
