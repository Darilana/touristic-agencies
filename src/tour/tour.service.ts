import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tour } from './tour.entity';
import { CreateTourParams } from './interfaces';
import constants from '../constants';
import { CategoryService } from '../category/category.service';
import { DirectionService } from '../direction/direction.service';

@Injectable()
export class TourService {
  constructor(
    @Inject(constants.TOUR_REPOSITORY)
    private tourRepository: Repository<Tour>,
    private categoryService: CategoryService,
    private directionService: DirectionService,
  ) {}

  async findAll(): Promise<Tour[]> {
    return this.tourRepository.find();
  }
  async create(createTourParams: CreateTourParams): Promise<Tour> {
    const categories = await this.categoryService.deduplicateCategories(createTourParams.categories || [])
    const directions = await this.directionService.deduplicateDirections(createTourParams.directions || [])
    return this.tourRepository.save({
      ...createTourParams,
      agency: {
        id: createTourParams.agencyId
      },
      categories,
      directions
    });
  }
  async findOne(id: number): Promise<Tour | null> {
    return this.tourRepository.findOne(id);
  }
  async remove(id: number): Promise<void> {
    await this.tourRepository.delete(id);
  }
}
