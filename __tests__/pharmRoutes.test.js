import request from 'supertest';
import server from '../api';

describe('', () => {
  let app;
  beforeAll(() => {
    app = server;
    return app.close();
  });

  afterAll(() => app.close());
  describe('Testing pharmacy routes', () => {
    let pharmId = '';
    const fakeId = '11772db9-7ff2-4d92-a1ef-75f0f1410deb';

    it('it should fail to fetch pharmacies', async () => {
      const res = await request(app).get('/api/v1/pharmacies');
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('No pharmacy found');
    });

    it('it should fetch one pharmacy', async () => {
      const res = await request(app).get('/api/v1/pharmacies/$1234');
      expect(res.statusCode).toEqual(404);
      expect(res.body.data).toBeDefined();
    });

    it('it should fail to fetch one pharmacy', async () => {
      const res = await request(app).get(`/api/v1/pharmacies/${fakeId}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe(`Cannot find Pharmacy with the id ${fakeId}`);
    });

    it('it should fail to add a new pharmacy', async () => {
      const res = await request(app)
        .post('/api/v1/Pharmacies')
        .send({
          name: 'test',
          logo: 'test',
          insurances: ['UAP', 'PRIME', 'RADIANT', 'MMI', 'BK insurance']
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.data).toBe('no data');
    });

    it('it should add a new pharmacy', async () => {
      const res = await request(app)
        .post('/api/v1/pharmacies')
        .send({
          name: 'test',
          logo: 'test',
          insurances: ['UAP', 'PRIME', 'RADIANT', 'MMI', 'BK insurance'],
          email: 'test@eabmibl.com',
          telephone: '9795857557',
          pharmRep: 'mugisha'
        });
      pharmId = res.body.data.id;
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toBeDefined();
    });

    it('it should fail to add a new pharmacy', async () => {
      const res = await request(app)
        .post('/api/v1/Pharmacies')
        .send({
          name: 'test',
          logo: 'test',
          insurances: ['UAP', 'PRIME', 'RADIANT', 'MMI', 'BK insurance'],
          email: 'test@eabmibl.com',
          telephone: '9795857557',
          pharmRep: 'mugisha'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Telephone number is already in use!');
    });

    it('it should fetch pharmacies', async () => {
      const res = await request(app).get('/api/v1/pharmacies');
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Pharmacies retrieved');
    });

    it('it should fetch requests', async () => {
      const res = await request(app).get('/api/v1/requests');
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Requests retrieved');
    });

    it('it should get one pharmacy', async () => {
      const res = await request(app).get(`/api/v1/pharmacies/${pharmId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.id).toBeDefined();
    });
    it('it should update pharmacy', async () => {
      const res = await request(app)
        .put(`/api/v1/pharmacies/${pharmId}`)
        .send({
          name: 'changed'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.email).toBeDefined();
    });

    it('it should Reject a request', async () => {
      const res = await request(app)
        .put(`/api/v1/requests/${pharmId}`)
        .send({
          status: 'rejected'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.email).toBeDefined();
    });
    it('it should delete one pharmacy', async () => {
      const res = await request(app).delete(`/api/v1/pharmacies/${pharmId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Pharmacy deleted');
    });

    it('it should fail to update pharmacy', async () => {
      const res = await request(app)
        .put('/api/v1/pharmacies/$1245')
        .send({
          name: 'changed'
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body.data).toBe('no data');
    });

    it('it should fail to update pharmacy', async () => {
      const res = await request(app).put(`/api/v1/pharmacies/${fakeId}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe(`Cannot find a Pharmacy with the id ${fakeId}`);
    });

    it('it should fail to delete pharmacy', async () => {
      const res = await request(app).delete(`/api/v1/pharmacies/${fakeId}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body.data).toBe('no data');
    });
  });
});
