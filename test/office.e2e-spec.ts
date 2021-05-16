import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Repository } from 'typeorm';
import { Office } from '../src/office/office.entity';
import constants from '../src/constants';
import { Agency } from '../src/agency/agency.entity';
import { BasicAuthGuard } from '../src/auth/auth-basic.guard';

describe('OfficeController (e2e)', () => {
  let app: INestApplication;
  let officeRepository: Repository<Office>;
  let agencyRepository: Repository<Agency>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideGuard(BasicAuthGuard)
      .useValue({
        canActivate: () => true,
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    officeRepository = app.get(constants.OFFICE_REPOSITORY);
    agencyRepository = app.get(constants.AGENCY_REPOSITORY);
    await officeRepository.delete({})
    await agencyRepository.delete({})
  });

  afterAll(async () => {
    await officeRepository.delete({})
    await agencyRepository.delete({})
  })

  it('should create the new office', async () => {
    const agency = await agencyRepository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    await request(app.getHttpServer())
      .post(`/api/office`)
      .send({
        address: 'TEST_ADDRESS',
        phoneNumber: 123456789,
        workingHours: 'TEST_WORKING_HOURS',
        agencyId: agency.id
      })
      .expect(201)
      .expect(response => {
        expect(response.body).toMatchObject({
          address: 'TEST_ADDRESS',
          phoneNumber: 123456789,
          workingHours: 'TEST_WORKING_HOURS'
        })
      });
  });

  it('should delete the office by office id', async () => {
    const agency = await agencyRepository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    const office = await officeRepository.save({
      address: 'TEST_ADDRESS',
      phoneNumber: 123456789,
      workingHours: 'TEST_WORKING_HOURS',
      agency: {
        id: agency.id
      }
    });
    await request(app.getHttpServer())
      .delete(`/api/office/${office.id}`)
      .expect(200);

    const searchResult = await officeRepository.findOne({
      id: office.id
    })
    expect(searchResult).toEqual(undefined);
  });

  it('should update the office', async () => {
    const agency = await agencyRepository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    const office = await officeRepository.save({
      address: 'TEST_ADDRESS',
      phoneNumber: 123456789,
      workingHours: 'TEST_WORKING_HOURS',
      agency: {
        id: agency.id
      }
    });
    await request(app.getHttpServer())
      .put(`/api/office/${office.id}`)
      .send({
        id: office.id,
        address: 'TEST_ADDRESS_2',
      })
      .expect(200)
      .expect(response => {
        expect(response.body).toEqual({
          id: office.id,
          address: 'TEST_ADDRESS_2',
          phoneNumber: 123456789,
          workingHours: 'TEST_WORKING_HOURS',
        })
      });
  });
});
