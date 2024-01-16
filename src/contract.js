"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = void 0;
const core_1 = require("@ts-rest/core");
const zod_1 = require("zod");
const c = (0, core_1.initContract)();
const Post = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    body: zod_1.z.string(),
});
exports.contract = c.router({
    createPost: {
        method: 'POST',
        path: '/posts',
        responses: {
            201: c.type(),
        },
        body: c.type(),
        summary: 'Create a post',
    },
    getPost: {
        method: 'GET',
        path: `/posts/:id`,
        responses: {
            200: c.type(),
        },
        summary: 'Get a post by id',
    },
});
