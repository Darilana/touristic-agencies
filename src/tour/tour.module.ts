import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tourProviders } from './tour.providers';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { CategoryModule } from '../category/category.module';
import { DirectionModule } from '../direction/direction.module';

@Module({
  imports: [DatabaseModule, CategoryModule, DirectionModule],
  providers: [...tourProviders, TourService],
  controllers: [TourController],
})
export class TourModule {}
