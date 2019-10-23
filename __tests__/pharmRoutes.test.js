import request from 'supertest';
import app from '../api/index';

let pharmSample = {};

describe('Testing routes', () => {
  it('it should add a new pharmacy', async () => {
    const res = await request(app)
      .post('/api/v1/Pharmacies')
      .send({
        name: 'fhfhf',
        logo: 'test',
        insurance: ['Remera', 'Remera', 'Remera', 'Remera', 'Gikondo']
      });
    pharmSample = res;
    console.log(pharmSample);
    expect(res.statusCode).toEqual(201);
  });

  it('it should fail to add a new pharmacy', async () => {
    const res = await request(app)
      .post('/api/v1/Pharmacies')
      .send({
        name: 'fhfhf',
        insurance: ['Remera', 'Remera', 'Remera', 'Remera', 'Gikondo']
      });
    expect(res.statusCode).toEqual(400);
  });

  it('it should fetch pharmacies', async () => {
    const res = await request(app).get('/api/v1/Pharmacies');
    expect(res.statusCode).toEqual(200);
  });

  it('it should get one pharmacy', () => {});
});