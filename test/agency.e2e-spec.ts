import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Repository } from 'typeorm';
import { Agency } from '../src/agency/agency.entity';
import constants from '../src/constants';
import { Office } from '../src/office/office.entity';

describe('AgencyController (e2e)', () => {
  let app: INestApplication;
  let agencyRepository: Repository<Agency>;
  let officeRepository: Repository<Office>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    agencyRepository = app.get(constants.AGENCY_REPOSITORY);
    officeRepository = app.get(constants.OFFICE_REPOSITORY);
  });

  afterEach(async () => {
    await officeRepository.delete({})
    await agencyRepository.delete({})
  })

  it('should return list of agencies', async () => {
    const agency = await agencyRepository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    return request(app.getHttpServer())
      .get('/api/agency')
      .expect(200)
      .expect(response => {
        expect(response.body).toEqual([{
          ...agency,
          offices: []
        }])
      });
  });

  it('should return the agency by id', async () => {
    const agency = await agencyRepository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    return request(app.getHttpServer())
      .get(`/api/agency/${agency.id}`)
      .expect(200)
      .expect(response => {
        expect(response.body).toEqual({
          id: agency.id,
          name: agency.name,
          description: agency.description,
          phoneNumber: agency.phoneNumber,
          status: agency.status,
          offices: []
        })
      });
  });

  it('should return the agency by id with offices', async () => {
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
    })
    return request(app.getHttpServer())
      .get(`/api/agency/${agency.id}`)
      .expect(200)
      .expect(response => {
        expect(response.body).toEqual({
          ...agency,
          offices: [{
            id: office.id,
            address: office.address,
            phoneNumber: office.phoneNumber,
            workingHours: office.workingHours,
          }]
        })
      });
  });

  it('should delete the agency by id', async () => {
    const agency = await agencyRepository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    await request(app.getHttpServer())
      .delete(`/api/agency/${agency.id}`)
      .expect(200);

    return request(app.getHttpServer())
      .get('/api/agency')
      .expect(200)
      .expect(response => {
        expect(response.body).toEqual([])
      });
  });

  it('should create the new agency', async () => {
    await request(app.getHttpServer())
      .post(`/api/agency`)
      .send({
        name: 'TEST_NAME',
        description: 'TEST_DESCRIPTION',
        phoneNumber: 123456789,
      })
      .expect(201)
      .expect(response => {
        expect(response.body).toMatchObject({
          name: 'TEST_NAME',
          description: 'TEST_DESCRIPTION',
          phoneNumber: 123456789,
          status: 'ACTIVE',
        })
      });
  });

  it('should update the agency', async () => {
    const agency = await agencyRepository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    return request(app.getHttpServer())
      .put(`/api/agency/${agency.id}`)
      .send({
        id: agency.id,
        description: 'TEST_DESCRIPTION_2'
      })
      .expect(200)
      .expect(response => {
        expect(response.body).toEqual({
          id: agency.id,
          name: agency.name,
          description: 'TEST_DESCRIPTION_2',
          phoneNumber: agency.phoneNumber,
          status: agency.status,
          offices: []
        })
      });
  });
});
