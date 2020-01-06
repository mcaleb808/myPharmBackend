import request from 'supertest';
import server from '../api';
import { User } from '../api/v1/models';
import user from './_mocks_/user.json';
import tokenHandler from '../api/v1/helpers/tokenHandler';
import { fakeToken, invalidToken1 } from './_mocks_/data';

describe('User routes tests', () => {
  let app, token, newAdmin;

  beforeAll(() => {
    app = server;
    app.close();
  });

  afterAll(() => app.close());

  it('it should logged in the user', async () => {
    newAdmin = await User.create({ ...user });
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: user.email, password: user.password });

    expect(res.body.message).toBe('Admin successfully logged in');
    expect(res.statusCode).toBe(200);
  });

  it('it should fail to log in a user', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: user.email, password: 'testPassword' });

    expect(res.body.message).toBe('incorrect email or password');
    expect(res.statusCode).toBe(401);
  });

  it('it should fail to log in a user', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'mugisah@test.org', password: 'testPassword' });

    expect(res.body.message).toBe('incorrect email or password');
    expect(res.statusCode).toBe(401);
  });

  it('it should fail to log in a user', async () => {
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
    expect(res.body.message).toBe('admin created successfully');
    expect(res.statusCode).toBe(201);
  });

  it('it should fail to create an admin', async () => {
    token = await tokenHandler(newAdmin);
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', token)
      .send({ ...user });

    expect(res.body.message).toBe('Email address already in use!');
    expect(res.statusCode).toBe(500);
  });

  it('it should fail to create an admin', async () => {
    token = await tokenHandler(newAdmin);
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', token)
      .send({ ...user, email: 'caleb ' });

    expect(res.body.message).toBe('email must be a valid email');
    expect(res.statusCode).toBe(404);
  });

  it('it should fail to create an admin', async () => {
    await newAdmin.update({ role: 'pharmacist' });
    token = await tokenHandler(newAdmin);
    user.role = 'pharmacist';
    const res = await request(app)
      .post('/api/v1/users')
      .set('token', token)
      .send({ ...user });
    expect(res.body.message).toBe("You don't have enough permission to perform this action");
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
    expect(res.body.message).toBe('the user who belong to this token does not exist.');
    expect(res.statusCode).toBe(403);
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
    expect(res.body.message).toBe('your token is invalid.');
    expect(res.statusCode).toBe(400);
  });
});
