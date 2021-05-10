import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tourProviders } from './tour.providers';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...tourProviders,
    TourService,
  ],
  controllers: [
    TourController
  ]
})
export class TourModule {}
