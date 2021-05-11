import { Module } from '@nestjs/common';
import { AgencyModule } from './agency/agency.module';
import { OfficeModule } from './office/office.module';
import { TourModule } from './tour/tour.module';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { ViewModule } from './view/view.module';

@Module({
  imports: [
    RenderModule.forRootAsync(Next({
      dev: process.env.NODE_ENV !== 'production',
    })),
    AgencyModule,
    OfficeModule,
    TourModule,
    ViewModule
  ],
})
export class AppModule {}
