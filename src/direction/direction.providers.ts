import { Connection } from 'typeorm';
import { Direction } from './direction.entity';
import constants from '../constants';

export const directionProviders = [
  {
    provide: constants.DIRECTION_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Direction),
    inject: [constants.DATABASE_CONNECTION],
  },
];
