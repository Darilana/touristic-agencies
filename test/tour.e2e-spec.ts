import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Repository } from 'typeorm';
import constants from '../src/constants';
import { Tour } from '../src/tour/tour.entity';
import { Agency } from '../src/agency/agency.entity';

describe('TourController (e2e)', () => {
  let app: INestApplication;
  let tourRepository: Repository<Tour>;
  let agencyRepository: Repository<Agency>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    tourRepository = app.get(constants.TOUR_REPOSITORY);
    agencyRepository = app.get(constants.AGENCY_REPOSITORY);
  });

  afterEach(async () => {
    await tourRepository.delete({});
    await agencyRepository.delete({});
  })

  it('should return list of tours', async () => {
    const agency = await agencyRepository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    const tour = await tourRepository.save({
      name: 'TEST_NAME',
      price: 10.00,
      description: 'TEST_DESCRIPTION',
      season: 'TEST',
      duration: 'P1W',
      agency: {
        id: agency.id
      }
    });
    return request(app.getHttpServer())
      .get('/api/tour')
      .expect(200)
      .expect(response => {
        expect(response.body).toEqual([{
          name: tour.name,
          price: tour.price,
          description: tour.description,
          season: tour.season,
          duration: tour.duration,
          id: tour.id,
        }])
      });
  });

  it('should return the tour by id', async () => {
    const agency = await agencyRepository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    const tour = await tourRepository.save({
      name: 'TEST_NAME',
      price: 10.00,
      description: 'TEST_DESCRIPTION',
      season: 'TEST',
      duration: 'P1W',
      agency: {
        id: agency.id
      }
    });
    return request(app.getHttpServer())
      .get(`/api/tour/${tour.id}`)
      .expect(200)
      .expect(response => {
        expect(response.body).toEqual({
          name: tour.name,
          price: tour.price,
          description: tour.description,
          season: tour.season,
          duration: tour.duration,
          id: tour.id,
        })
      });
  });

  it('should delete the tour by id', async () => {
    const agency = await agencyRepository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    const tour = await tourRepository.save({
      name: 'TEST_NAME',
      price: 10.00,
      description: 'TEST_DESCRIPTION',
      season: 'TEST',
      duration: 'P1W',
      agency: {
        id: agency.id
      }
    });
    await request(app.getHttpServer())
      .delete(`/api/tour/${tour.id}`)
      .expect(200);

    return request(app.getHttpServer())
      .get('/api/tour')
      .expect(200)
      .expect(response => {
        expect(response.body).toEqual([])
      });
  });

  it('should create the new tour', async () => {
    const agency = await agencyRepository.save({
      name: 'TEST_NAME',
      description: 'TEST_DESCRIPTION',
      phoneNumber: 123456789,
    });
    await request(app.getHttpServer())
      .post(`/api/tour`)
      .send({
        name: 'TEST_NAME',
        price: 10.00,
        description: 'TEST_DESCRIPTION',
        season: 'TEST',
        duration: 'P1W',
        agencyId: agency.id
      })
      .expect(201)
      .expect(response => {
        expect(response.body).toMatchObject({
          name: 'TEST_NAME',
          price: 10.00,
          description: 'TEST_DESCRIPTION',
          season: 'TEST',
          duration: 'P1W',
        })
      });
  });
});
