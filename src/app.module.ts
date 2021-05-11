import { Module } from '@nestjs/common';
import { AgencyModule } from './agency/agency.module';
import { OfficeModule } from './office/office.module';
import { TourModule } from './tour/tour.module';
import { RenderModule } from 'nest-next';
import { ViewModule } from './view/view.module';

@Module({
  imports: [
    AgencyModule,
    OfficeModule,
    TourModule,
    RenderModule,
    ViewModule
  ],
})
export class AppModule {}
