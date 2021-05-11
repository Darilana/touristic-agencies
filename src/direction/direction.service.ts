import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Direction } from './direction.entity';
import constants from '../constants';
import { Category } from '../category/category.entity';

@Injectable()
export class DirectionService {
  constructor(
    @Inject(constants.DIRECTION_REPOSITORY)
    private directionRepository: Repository<Direction>,
  ) {}

  findByName(name:string): Promise<Category | undefined> {
    return this.directionRepository.findOne({ name });
  }

  deduplicateDirections(directions: Pick<Direction, 'name'>[]): Promise<Partial<Direction>[]> {
    return Promise.all(directions.map(async (direction) => {
      const existingDirection = await this.findByName(direction.name);
      return existingDirection || direction;
    }))
  }
}
