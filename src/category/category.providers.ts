import { Connection } from 'typeorm';
import { Category } from './category.entity';
import constants from '../constants';

export const categoryProviders = [
  {
    provide: constants.CATEGORY_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Category),
    inject: [constants.DATABASE_CONNECTION],
  },
];
