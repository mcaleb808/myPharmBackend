import request from 'supertest';
import app from '../api/index';

describe('Testing pharmacie routes', () => {
  let pharmId = '';

  it('it should fail to fetch pharmacies', async () => {
    const res = await request(app).get('/api/v1/pharmacies');
    expect(res.statusCode).toEqual(404);
  });

  it('it should fetch one pharmacy', async () => {
    const res = await request(app).get('/api/v1/pharmacies/1234');
    expect(res.statusCode).toEqual(404);
  });

  it('it should add a new pharmacy', async () => {
    const res = await request(app)
      .post('/api/v1/pharmacies')
      .send({
        name: 'test',
        logo: 'test',
        insurance: ['Remera', 'Remera', 'Remera', 'Remera', 'Gikondo'],
        email: 'test@eabmibl.com',
        telephone: '9795857557',
        pharmRep: 'mugisha'
      });
    pharmId = res.body.data.id;
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
    const res = await request(app).get('/api/v1/pharmacies');
    expect(res.statusCode).toEqual(200);
  });

  it('it should get one pharmacy', async () => {
    const res = await request(app).get(`/api/v1/pharmacies/${pharmId}`);
    expect(res.statusCode).toEqual(200);
  });
  it('it should update pharmacy', async () => {
    const res = await request(app)
      .put(`/api/v1/pharmacies/${pharmId}`)
      .send({
        name: 'changed'
      });
    expect(res.statusCode).toEqual(200);
  });

  it('it should delete one pharmacy', async () => {
    const res = await request(app).delete(`/api/v1/pharmacies/${pharmId}`);
    expect(res.statusCode).toEqual(200);
  });

  it('it should fail to update pharmacy', async () => {
    const res = await request(app)
      .put('/api/v1/pharmacies/$1234')
      .send({
        name: 'changed'
      });
    expect(res.statusCode).toEqual(404);
  });
});
