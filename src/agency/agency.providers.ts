import { Connection } from 'typeorm';
import { Agency } from './agency.entity';
import constants from '../constants';

export const agencyProviders = [
  {
    provide: constants.AGENCY_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Agency),
    inject: [constants.DATABASE_CONNECTION],
  },
];
