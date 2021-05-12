import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Agency } from './agency.entity';
import { CreateAgencyParams, UpdateAgencyParams } from './agency.dto';
import constants from '../constants';

@Injectable()
export class AgencyService {
  constructor(
    @Inject(constants.AGENCY_REPOSITORY)
    private agencyRepository: Repository<Agency>,
  ) {}

  async findAll(): Promise<Agency[]> {
    return this.agencyRepository.find();
  }
  async create(createAgencyParams: CreateAgencyParams): Promise<Agency> {
    return this.agencyRepository.save(createAgencyParams);
  }
  async update(updateAgencyParams: UpdateAgencyParams): Promise<Agency> {
    await this.agencyRepository.update(updateAgencyParams.id, updateAgencyParams);
    return this.agencyRepository.findOne(updateAgencyParams.id);
  }
  async findOne(id: number): Promise<Agency | null> {
    return this.agencyRepository.findOne(id);
  }
  async remove(id: number): Promise<void> {
    await this.agencyRepository.delete(id);
  }
}
