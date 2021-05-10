import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTourParams } from './interfaces';
import { Tour } from './tour.entity';
import { TourService } from './tour.service';

@Controller('/api/tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  create(@Body() createTourParams: CreateTourParams): Promise<Tour> {
    return this.tourService.create(createTourParams);
  }

  @Get()
  findAll(): Promise<Tour[]> {
    return this.tourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tour> {
    return this.tourService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.tourService.remove(id);
  }
}
