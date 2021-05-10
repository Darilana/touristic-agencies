import { Module } from '@nestjs/common';
import { AgencyModule } from './agency/agency.module';
import { OfficeModule } from './office/office.module';
import { TourModule } from './tour/tour.module';

@Module({
  imports: [
    AgencyModule,
    OfficeModule,
    TourModule,
  ],
})
export class AppModule {}
