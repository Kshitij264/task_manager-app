const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/authRoutes');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
  const url = `mongodb://localhost:27017/test-auth-db`;
  process.env.JWT_SECRET = 'test-secret';
  await mongoose.connect(url);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth Endpoints', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register a user with an existing email', async () => {
    await request(app).post('/api/auth/register').send({ email: 'test2@example.com', password: 'password123'});
    const res = await request(app).post('/api/auth/register').send({ email: 'test2@example.com', password: 'password123'});
    expect(res.statusCode).toEqual(400);
  });

  it('should login an existing user successfully', async () => {
    await request(app).post('/api/auth/register').send({ email: 'login@example.com', password: 'password123'});
    const res = await request(app).post('/api/auth/login').send({ email: 'login@example.com', password: 'password123'});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with a wrong password', async () => {
    await request(app).post('/api/auth/register').send({ email: 'login2@example.com', password: 'password123'});
    const res = await request(app).post('/api/auth/login').send({ email: 'login2@example.com', password: 'wrongpassword'});
    expect(res.statusCode).toEqual(400);
  });

  it('should not login a non-existent user', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'nouser@example.com', password: 'password123'});
    expect(res.statusCode).toEqual(400);
  });
});