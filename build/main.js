"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@ts-rest/express");
const contract_1 = require("./contract");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const s = (0, express_2.initServer)();
const router = s.router(contract_1.contract, {
    getPost: ({ params: { id } }) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield prisma.post.findUnique({ where: { id: Number(id) } });
        return {
            status: 200,
            body: post,
        };
    }),
    createPost: ({ body }) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield prisma.post.create({
            data: {
                title: body.title,
                body: body.body,
            },
        });
        return {
            status: 201,
            body: post,
        };
    }),
});
(0, express_2.createExpressEndpoints)(contract_1.contract, router, app);
const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
