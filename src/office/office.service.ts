import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Office } from './office.entity';
import { CreateOfficeParams, UpdateOfficeParams } from './office.dto';
import constants from '../constants';

@Injectable()
export class OfficeService {
  constructor(
    @Inject(constants.OFFICE_REPOSITORY)
    private officeRepository: Repository<Office>,
  ) {}

  async create(createOfficeParams: CreateOfficeParams): Promise<Office> {
    return this.officeRepository.save({
      ...createOfficeParams,
      agency: {
        id: createOfficeParams.agencyId
      }
    });
  }

  async update(updateOfficeParams: UpdateOfficeParams): Promise<Office> {
    await this.officeRepository.update({ id: updateOfficeParams.id }, updateOfficeParams);
    return this.officeRepository.findOne(updateOfficeParams.id);
  }

  async remove(id: number): Promise<void> {
    await this.officeRepository.delete(id);
  }
}
