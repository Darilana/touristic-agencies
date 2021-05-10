import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Repository } from 'typeorm';
import { Agency } from '../src/agency/agency.entity';
import constants from '../src/constants';

describe('AgencyController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Agency>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = app.get(constants.AGENCY_REPOSITORY);
  });

  afterEach(async () => {
    await repository.delete({})
  })

  it('should return list of agencies', async () => {
    const agency = await repository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    return request(app.getHttpServer())
      .get('/api/agency')
      .expect(200)
      .expect(response => {
        expect(response.body).toEqual([agency])
      });
  });

  it('should return the agency by id', async () => {
    const agency = await repository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    return request(app.getHttpServer())
      .get(`/api/agency/${agency.id}`)
      .expect(200)
      .expect(response => {
        expect(response.body).toEqual(agency)
      });
  });

  it('should delete the agency by id', async () => {
    const agency = await repository.save({
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
});
