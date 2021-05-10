import { Connection } from 'typeorm';
import { Office } from './office.entity';
import constants from '../constants';

export const officeProviders = [
  {
    provide: constants.OFFICE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Office),
    inject: [constants.DATABASE_CONNECTION],
  },
];
