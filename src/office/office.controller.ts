import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateOfficeParams } from './interfaces';
import { Office } from './office.entity';
import { OfficeService } from './office.service';

@Controller('/api/office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Post()
  create(@Body() createOfficeParams: CreateOfficeParams): Promise<Office> {
    return this.officeService.create(createOfficeParams);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.officeService.remove(id);
  }
}
