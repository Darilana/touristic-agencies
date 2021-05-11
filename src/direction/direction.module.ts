import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { directionProviders } from './direction.providers';
import { DirectionService } from './direction.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...directionProviders,
    DirectionService,
  ],
  exports: [DirectionService]
})
export class DirectionModule {}
