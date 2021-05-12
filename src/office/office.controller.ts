import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateOfficeParams, UpdateOfficeParams } from './office.dto';
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

  @Put(':id')
  async update(@Body() updateOfficeParams: UpdateOfficeParams): Promise<Office> {
    return this.officeService.update(updateOfficeParams);
  }
}
