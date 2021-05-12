import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateAgencyParams, UpdateAgencyParams } from './agency.dto';
import { Agency } from './agency.entity';
import { AgencyService } from './agency.service';

@Controller('/api/agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post()
  create(@Body() createAgencyParams: CreateAgencyParams): Promise<Agency> {
    return this.agencyService.create(createAgencyParams);
  }

  @Put(':id')
  update(@Body() updateAgencyParams: UpdateAgencyParams): Promise<Agency> {
    return this.agencyService.update(updateAgencyParams);
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
