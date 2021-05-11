import { Office } from './office.entity';

export interface CreateOfficeParams {
  agencyId: number;
  phoneNumber: number;
  workingHours: string;
  address: string;
}
export interface UpdateOfficeParams {
  id: number;
  phoneNumber: number;
  workingHours: string;
  address: string;
}
