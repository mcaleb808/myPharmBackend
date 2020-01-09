import request from 'supertest';
import server from '../api';

describe('Testing membership request routes', () => {
  let app;
  const fakeID = '11772db9-7ff2-4d92-a1ef-75f0f1410deb';
  const baseURL = '/api/v1/requests';
  beforeAll(() => {
    app = server;
    return app.close();
  });

  afterAll(() => app.close());
  describe('Membership confirmation', () => {
    it('should return a 401 if they are unauthorized', async () => {
      const res = await request(app).patch(`${baseURL}/${fakeID}/confirm`);
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/No token/);
    });

    it.skip("should return a 403 if the user doesn't have sufficient permission", async () => {
      const res = await request(app).patch(`${baseURL}/${fakeID}/confirm`);
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/You don't have permission/);
    });

    it.skip("should return a 404 if the membership request doesn't exist", async () => {
      const res = await request(app).patch(`${baseURL}/${fakeID}/confirm`);
      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/We don't have such membership/);
    });

    it.skip('should return a 400 if the id is invalid or not provided', async () => {
      const res = await request(app).patch(`${baseURL}/${fakeID}/confirm`);
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Invalid id/);
    });

    it.skip('should return a 200 request confirmation is successful', async () => {
      const { memberships = [] } = await request(app).get(baseURL);
      const [membership] = memberships;
      const res = await request(app).patch(`${baseURL}/${membership.id}/confirm`);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/confirmation successful/);
    });
  });
});
