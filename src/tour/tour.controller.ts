import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateTourParams, UpdateTourParams } from './tour.dto';
import { Tour } from './tour.entity';
import { TourService } from './tour.service';
import { BasicAuthGuard } from '../auth/auth-basic.guard';

@UseGuards(BasicAuthGuard)
@Controller('/api/tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  create(@Body() createTourParams: CreateTourParams): Promise<Tour> {
    return this.tourService.create(createTourParams);
  }

  @Put(':id')
  update(@Body() updateTourParams: UpdateTourParams): Promise<Tour> {
    return this.tourService.update(updateTourParams);
  }

  @Get()
  findAll(@Query('category') category: string, @Query('direction') direction: string): Promise<Tour[]> {
    return this.tourService.findAll(category, direction);
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
