import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import constants from '../constants';
import { Agency } from '../agency/agency.entity';
import { Tour } from '../tour/tour.entity';
import { Direction } from '../direction/direction.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @Inject(constants.DATABASE_CONNECTION)
    private dbConnection: Connection,
  ) {}

  async getQueryResult(sql: string): Promise<object> {
    try {
      return await this.dbConnection.query(sql);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getReport(): Promise<object> {
    return {
      agencyCount: await this.dbConnection
        .createQueryBuilder(Agency, 'agency')
        .getCount(),
      tourCount: await this.dbConnection
        .createQueryBuilder(Tour, 'tour')
        .getCount(),
      categoryCount: await this.dbConnection
        .createQueryBuilder(Category, 'category')
        .getCount(),
      directionCount: await this.dbConnection
        .createQueryBuilder(Direction, 'direction')
        .getCount(),
      directionsByPopularity: await this.dbConnection
        .createQueryBuilder()
        .select('direction.name, count(*)')
        .from('tour_directions_direction', 'tourDirection')
        .leftJoin(
          Direction,
          'direction',
          'tourDirection.directionId = direction.id',
        )
        .addGroupBy('tourDirection.directionId, direction.id, direction.name')
        .orderBy('count(*)', 'DESC')
        .execute(),
      categoriesByPopularity: await this.dbConnection
        .createQueryBuilder()
        .select('category.name, count(*)')
        .from('tour_categories_category', 'tourCategory')
        .leftJoin(Category, 'category', 'tourCategory.categoryId = category.id')
        .addGroupBy('tourCategory.categoryId, category.id, category.name')
        .orderBy('count(*)', 'DESC')
        .execute(),
      agenciesByNumberOfOffices: await this.dbConnection
        .createQueryBuilder(Agency, 'agency')
        .select('agency.name, count(office.id)')
        .leftJoin('agency.offices', 'office')
        .addGroupBy('agency.name')
        .orderBy('count(office.id)', 'DESC')
        .execute(),
    };
  }
}
