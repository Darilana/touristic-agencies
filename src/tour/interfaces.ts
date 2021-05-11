import { Category } from '../category/category.entity';
import { Direction } from '../direction/direction.entity';

export interface CreateTourParams {
  name: string;
  price: number;
  description: string;
  season: string;
  duration: string;
  agencyId: number;
  categories: Pick<Category, 'name'>[];
  directions: Pick<Direction, 'name'>[];
}
