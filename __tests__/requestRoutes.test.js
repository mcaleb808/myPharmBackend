import request from 'supertest';
import server from '../api';
import { User, Pharmacy } from '../api/v1/models';

const nodemailer = require('nodemailer');

const sendMailMock = jest.fn().mockReturnValue('Email sent!!');
const baseURL = '/api/v1/requests';
jest.mock('nodemailer');
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

describe('Testing membership request routes', () => {
  let app, pharmacies, users, pharmacists, admins, pharmacist, admin;
  beforeAll(async () => {
    app = server;

    users = await User.findAll().map(user => user.get());
    pharmacies = await Pharmacy.findAll({ where: { status: 'pending' } })
      .map(pharmacy => pharmacy.get());
    pharmacists = users.filter(user => user.role.includes('pharm'));
    admins = users.filter(user => user.role.includes('admin'));
    ([admin] = admins);
    ([pharmacist] = pharmacists);

    const { body: { data: { token: pharmToken } = {} } } = await request(app)
      .post('/api/v1/users/login')
      .send({ email: pharmacist.email, password: 'GogfiD3hFO2d' });
    pharmacist.token = pharmToken;
    const { body: { data: { token: adminToken } = {} } } = await request(app)
      .post('/api/v1/users/login')
      .send({ email: admin.email, password: process.env.ADMIN_PASSWORD });
    admin.token = adminToken;

    sendMailMock.mockClear();
    nodemailer.createTransport.mockClear();
    return app.close();
  });

  afterAll(() => app.close());

  describe('Membership confirmation', () => {
    it('should return a 401 if they are unauthorized', async () => {
      const res = await request(app).patch(`${baseURL}/${users[0].id}/confirm`);
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/No token/);
    });

    it("should return a 403 if the user doesn't have sufficient permission", async () => {
      const res = await request(app).patch(`${baseURL}/${users[0].id}/confirm`).set('token', pharmacist.token);
      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/You don't have permission/);
    });

    it("should return a 404 if the membership request doesn't exist", async () => {
      const res = await request(app).patch(`${baseURL}/${users[0].id}/confirm`).set('token', admin.token);
      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/We don't have such membership/);
    });

    it('should return a 200 request confirmation is successful', async () => {
      const res = await request(app).patch(`${baseURL}/${pharmacies[0].id}/confirm`).set('token', admin.token);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/confirmation successful/);
    });
  });
});
