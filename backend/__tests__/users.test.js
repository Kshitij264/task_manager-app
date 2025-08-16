const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../routes/userRoutes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect, admin } = require('../middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use('/api/users', protect, admin, userRoutes);

let adminUser, regularUser, adminToken, regularUserToken;

beforeAll(async () => {
  const url = `mongodb://localhost:27017/test-users-db`;
  process.env.JWT_SECRET = 'test-secret';
  await mongoose.connect(url);

  adminUser = new User({ email: 'admin@example.com', password: 'password123', role: 'admin' });
  regularUser = new User({ email: 'user@example.com', password: 'password123', role: 'user' });
  await adminUser.save();
  await regularUser.save();

  adminToken = jwt.sign({ user: { id: adminUser.id, role: adminUser.role } }, process.env.JWT_SECRET);
  regularUserToken = jwt.sign({ user: { id: regularUser.id, role: regularUser.role } }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('User Endpoints (Admin)', () => {
  it('should get all users for an admin', async () => {
    const res = await request(app).get('/api/users').set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it('should NOT allow a regular user to get all users', async () => {
    const res = await request(app).get('/api/users').set('Authorization', `Bearer ${regularUserToken}`);
    expect(res.statusCode).toEqual(401);
  });

  it('should get a single user by ID for an admin', async () => {
    const res = await request(app).get(`/api/users/${regularUser._id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toBe('user@example.com');
  });
  
  it('should delete a user for an admin', async () => {
    const userToDelete = new User({ email: 'deleteme@example.com', password: 'password123' });
    await userToDelete.save();
    const res = await request(app).delete(`/api/users/${userToDelete._id}`).set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });
});