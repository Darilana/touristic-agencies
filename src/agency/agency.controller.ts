import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAgencyParams } from './agency.dto';
import { Agency } from './agency.entity';
import { AgencyService } from './agency.service';

@Controller('/api/agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post()
  create(@Body() createAgencyParams: CreateAgencyParams): Promise<Agency> {
    return this.agencyService.create(createAgencyParams);
  }

  @Get()
  findAll(): Promise<Agency[]> {
    return this.agencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Agency> {
    return this.agencyService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.agencyService.remove(id);
  }
}
