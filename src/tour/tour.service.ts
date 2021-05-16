import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tour } from './tour.entity';
import { CreateTourParams, UpdateTourParams } from './tour.dto';
import constants from '../constants';
import { CategoryService } from '../category/category.service';
import { DirectionService } from '../direction/direction.service';
import { Category } from '../category/category.entity';
import { Direction } from '../direction/direction.entity';

@Injectable()
export class TourService {
  constructor(
    @Inject(constants.TOUR_REPOSITORY)
    private tourRepository: Repository<Tour>,
    private categoryService: CategoryService,
    private directionService: DirectionService,
  ) {}

  async findAll(category?: string, direction?: string): Promise<Tour[]> {
    let queryBuilder = this.tourRepository
      .createQueryBuilder('tour')
      .leftJoinAndSelect('tour.directions', 'direction')
      .leftJoinAndSelect('tour.categories', 'category')
    if (category) {
      queryBuilder = queryBuilder.andWhere('category.name = :name', { name: category })
    }
    if (direction) {
      queryBuilder = queryBuilder.andWhere('direction.name = :name', { name: direction })
    }
    return queryBuilder.getMany();
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
  async update(updateTourParams: UpdateTourParams): Promise<Tour> {
    const categories = await this.categoryService.deduplicateCategories(updateTourParams.categories || []) as Category[]
    const directions = await this.directionService.deduplicateDirections(updateTourParams.directions || []) as Direction[]
    const tour = await this.tourRepository.findOne(updateTourParams.id);
    Object.assign(tour, updateTourParams);
    tour.categories = categories;
    tour.directions = directions;
    return this.tourRepository.save(tour);
    // await this.tourRepository.update(updateTourParams.id, {
    //   ...updateTourParams,
    //   categories,
    //   directions
    // });
    // return this.tourRepository.findOne(updateTourParams.id)
  }
  async findOne(id: number): Promise<Tour | null> {
    return this.tourRepository.findOne(id, {
      relations: ['agency']
    });
  }
  async remove(id: number): Promise<void> {
    await this.tourRepository.delete(id);
  }
}
