import request from 'supertest';
import server from '../api';
import { User } from '../api/v1/models';
import user from './__mocks__/user.json';
import tokenHandler from '../api/v1/helpers/tokenHandler';
import { fakeToken, invalidToken1 } from './__mocks__/data';

describe('User routes tests', () => {
  let app, token, newAdmin;

  beforeAll(() => {
    app = server;
    app.close();
  });

  afterAll(() => app.close());

  it('it should successfully log in the user', async () => {
    newAdmin = await User.create({ ...user });
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: user.email, password: user.password });

    expect(res.body.message).toMatch(/successfully logged/);
    expect(res.statusCode).toBe(200);
  });

  it('it should return 401 if they provided invalid credentials', async () => {
    const res1 = await request(app)
      .post('/api/v1/users/login')
      .send({ email: user.email, password: 'testPassword' });
    const res2 = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'mugisah@test.org', password: 'testPassword' });
    expect(res1.statusCode).toEqual(res2.statusCode);
    expect(res1.body.message).toEqual(res2.body.message);
    expect(res1.body.message).toBe('incorrect email or password');
    expect(res1.statusCode).toBe(401);
  });

  it('it should 404 if the user provided an incorrect email', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'mug', password: 'testPassword' });

    expect(res.body.message).toBe('email must be a valid email');
    expect(res.statusCode).toBe(404);
  });

  it('it should create an admin', async () => {
    token = await tokenHandler(newAdmin);
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', token)
      .send({ ...user, email: 'caleb@mugisha.com' });
    expect(res.body.message).toMatch(/admin created/);
    expect(res.statusCode).toBe(201);
  });

  it('it should fail to create an admin if they use an already used email', async () => {
    token = await tokenHandler(newAdmin);
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', token)
      .send({ ...user });

    expect(res.body.message).toBe('Email address already in use!');
    expect(res.statusCode).toBe(500);
  });

  it('it should fail to create an admin if they provided an invalid email', async () => {
    token = await tokenHandler(newAdmin);
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', token)
      .send({ ...user, email: 'caleb ' });

    expect(res.body.message).toMatch(/must be a valid email/);
    expect(res.statusCode).toBe(404);
  });

  it("it should fail to create an admin if they don't have permissions", async () => {
    await newAdmin.update({ role: 'pharmacist' });
    token = await tokenHandler(newAdmin);
    user.role = 'pharmacist';
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', token)
      .send({ ...user });
    expect(res.body.message).toMatch(/You don't have enough permission/);
    expect(res.statusCode).toBe(401);
  });

  it('it should fail to create an admin', async () => {
    await newAdmin.update({ role: 'pharm' });
    token = await tokenHandler(newAdmin);
    user.role = 'pharmacist';
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', token)
      .send({ ...user });
    expect(res.body.message).toBe('Role not found: "pharm"');
    expect(res.statusCode).toBe(500);
  });

  it('it should fail to create an admin with fake token', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', fakeToken)
      .send({ ...user });
    expect(res.body.message).toMatch(/Invalid credentials/);
    expect(res.statusCode).toBe(401);
  });

  it('it should fail to create an admin without a token', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ ...user });
    expect(res.body.message).toBe('No token provided.');
    expect(res.statusCode).toBe(401);
  });

  it('it should fail to create an admin with invalid token', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', invalidToken1)
      .send({ ...user });
    expect(res.body.message).toMatch(/Invalid credential/);
    expect(res.statusCode).toBe(401);
  });
});
