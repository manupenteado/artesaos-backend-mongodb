import { MongoClient } from 'mongodb';
process.env.MONGO_URI = 'mongodb://usuario_teste:senha_teste@localhost:27017/artesaosdb';

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import request from 'supertest';
import express from 'express';
import userRoutes from '../src/routes/user.route.js';
import db from '../src/database/configdb.js';

jest.setTimeout(15000);

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

beforeAll(async () => {
  // Conecta como admin root para criar o usuário de teste
  const adminUri = 'mongodb://root:example@localhost:27017/admin';
  const client = new MongoClient(adminUri);
  await client.connect();
  const testDb = client.db('artesaosdb');
  const users = await testDb.command({ usersInfo: "usuario_teste" });
  if (!users.users.length) {
    await testDb.command({
      createUser: "usuario_teste",
      pwd: "senha_teste",
      roles: [ { role: "readWrite", db: "artesaosdb" } ]
    });
  }
  await client.close();

  await db.connect();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Endpoints', () => {
  it('deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        name: 'Teste',
        email: `teste${Date.now()}@mail.com`,
        password: '123456'
      });
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email');
  });
});