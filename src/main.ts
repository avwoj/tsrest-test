import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { initServer, createExpressEndpoints } from '@ts-rest/express';
import { contract } from './contract';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer();

const router = s.router(contract, {
  getPost: async ({ params: { id } }) => {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    return {
      status: 200,
      body: post,
    };
  },
  createPost: async ({ body }) => {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        body: body.body,
      },
    });
  
    return {
      status: 201,
      body: post,
    };
  },
});

createExpressEndpoints(contract, router, app);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
