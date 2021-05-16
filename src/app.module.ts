import { Module } from '@nestjs/common';
import { AgencyModule } from './agency/agency.module';
import { OfficeModule } from './office/office.module';
import { TourModule } from './tour/tour.module';
import { RenderModule } from 'nest-next';
import { ViewModule } from './view/view.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AgencyModule,
    OfficeModule,
    TourModule,
    RenderModule,
    ViewModule,
    AuthModule,
  ],
})
export class AppModule {}
