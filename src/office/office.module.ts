import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { officeProviders } from './office.providers';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...officeProviders, OfficeService],
  controllers: [OfficeController],
})
export class OfficeModule {}
