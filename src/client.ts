import { initClient } from '@ts-rest/core';
import { contract } from './contract';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const client = initClient(contract, {
  baseUrl: 'http://localhost:3333',
  baseHeaders: {},
});

// Example usage
async function createPost() {
  const { body, status } = await client.createPost({
    body: {
      title: 'Post Title',
      body: 'Post Body',
    },
  });

  if (status === 201) {
    console.log(body); // body is Post
  } else {
    console.log(body); // body is unknown
  }
}

createPost();