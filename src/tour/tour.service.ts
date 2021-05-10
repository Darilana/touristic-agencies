import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tour } from './tour.entity';
import { CreateTourParams } from './interfaces';
import constants from '../constants';

@Injectable()
export class TourService {
  constructor(
    @Inject(constants.TOUR_REPOSITORY)
    private tourRepository: Repository<Tour>,
  ) {}

  async findAll(): Promise<Tour[]> {
    return this.tourRepository.find();
  }
  async create(createTourParams: CreateTourParams): Promise<Tour> {
    return this.tourRepository.save({
      ...createTourParams,
      agency: {
        id: createTourParams.agencyId
      }
    });
  }
  async findOne(id: number): Promise<Tour | null> {
    return this.tourRepository.findOne(id);
  }
  async remove(id: number): Promise<void> {
    await this.tourRepository.delete(id);
  }
}
