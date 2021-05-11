import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import constants from '../constants';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(constants.CATEGORY_REPOSITORY)
    private categoryRepository: Repository<Category>,
  ) {}

  findByName(name:string): Promise<Category | undefined> {
    return this.categoryRepository.findOne({ name });
  }

  deduplicateCategories(categories: Pick<Category, 'name'>[]): Promise<Partial<Category>[]> {
    return Promise.all(categories.map(async (category) => {
      const existingCategory = await this.findByName(category.name);
      return existingCategory || category;
    }))
  }
}
