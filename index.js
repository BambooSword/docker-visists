"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
console.log('====================================');
console.log('run run run');
console.log('====================================');
const client = (0, redis_1.createClient)({
    url: 'redis://redis-server:6379',
}).on('error', err => console.log('Redis Client Error', err));
client.connect();
client.set('visits', 0);
console.log('🚀 ~ file: index.ts:14 ~ 0:', 0);
app.get('/', (req, res, next) => {
    client.get('visits').then(visits => {
        res.send('Number of visits is ' + visits);
        console.log('🚀 ~ file: index.ts:22 ~ client.get ~ visits:', visits);
        if (visits) {
            client.set('visits', parseInt(visits) + 1);
        }
    });
});
app.listen(8081, () => {
    console.log('====================================');
    console.log('Listening on port 8081');
    console.log('====================================');
});
