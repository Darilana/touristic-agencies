import { Module } from '@nestjs/common';
import { AgencyModule } from './agency/agency.module';
import { OfficeModule } from './office/office.module';

@Module({
  imports: [
    AgencyModule,
    OfficeModule
  ],
})
export class AppModule {}
