import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { agencyProviders } from './agency.providers';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...agencyProviders, AgencyService],
  controllers: [AgencyController],
})
export class AgencyModule {}
