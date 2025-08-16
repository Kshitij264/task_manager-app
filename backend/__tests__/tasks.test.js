const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('../routes/taskRoutes');
const User = require('../models/User');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use('/api/tasks', protect, taskRoutes); 

let testUser, otherUser, testUserToken, testTask;

beforeAll(async () => {
  const url = `mongodb://localhost:27017/test-tasks-db`;
  process.env.JWT_SECRET = 'test-secret';
  await mongoose.connect(url);

  testUser = new User({ email: 'taskuser@example.com', password: 'password123' });
  otherUser = new User({ email: 'otheruser@example.com', password: 'password123' });
  await testUser.save();
  await otherUser.save();
  
  testUserToken = jwt.sign({ user: { id: testUser.id, role: testUser.role } }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Task Endpoints', () => {
  beforeEach(async () => {
    await Task.deleteMany({});
    testTask = new Task({ title: 'Initial Task', description: 'A task for testing', assignedTo: testUser._id, dueDate: new Date() });
    await testTask.save();
  });

  it('should create a new task', async () => {
    const res = await request(app).post('/api/tasks').set('Authorization', `Bearer ${testUserToken}`).send({ title: 'A New Task', description: 'From test', dueDate: new Date() });
    expect(res.statusCode).toEqual(201);
  });

  it('should get all tasks for the user', async () => {
    const res = await request(app).get('/api/tasks').set('Authorization', `Bearer ${testUserToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.tasks.length).toBe(1);
  });

  it('should get a single task by ID', async () => {
    const res = await request(app).get(`/api/tasks/${testTask._id}`).set('Authorization', `Bearer ${testUserToken}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should return 404 for a non-existent task ID', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/tasks/${fakeId}`).set('Authorization', `Bearer ${testUserToken}`);
    expect(res.statusCode).toEqual(404);
  });

  it('should update a task', async () => {
    const res = await request(app).put(`/api/tasks/${testTask._id}`).set('Authorization', `Bearer ${testUserToken}`).send({ status: 'Done' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('Done');
  });

  it('should delete a task', async () => {
    const res = await request(app).delete(`/api/tasks/${testTask._id}`).set('Authorization', `Bearer ${testUserToken}`);
    expect(res.statusCode).toEqual(200);
  });
});