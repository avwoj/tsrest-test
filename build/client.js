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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ts-rest/core");
const contract_1 = require("./contract");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const client = (0, core_1.initClient)(contract_1.contract, {
    baseUrl: 'http://localhost:3333',
    baseHeaders: {},
});
// Example usage
function createPost() {
    return __awaiter(this, void 0, void 0, function* () {
        const { body, status } = yield client.createPost({
            body: {
                title: 'Post Title',
                body: 'Post Body',
            },
        });
        if (status === 201) {
            console.log(body); // body is Post
        }
        else {
            console.log(body); // body is unknown
        }
    });
}
createPost();
