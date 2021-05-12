import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Agency } from './agency.entity';
import { CreateAgencyParams } from './agency.dto';
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
  async findOne(id: number): Promise<Agency | null> {
    return this.agencyRepository.findOne(id);
  }
  async remove(id: number): Promise<void> {
    await this.agencyRepository.delete(id);
  }
}
