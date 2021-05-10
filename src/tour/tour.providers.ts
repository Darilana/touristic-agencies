import { Connection } from 'typeorm';
import { Tour } from './tour.entity';
import constants from '../constants';

export const tourProviders = [
  {
    provide: constants.TOUR_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Tour),
    inject: [constants.DATABASE_CONNECTION],
  },
];
