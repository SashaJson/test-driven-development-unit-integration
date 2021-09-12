'use strict';

const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const ENDPOINT_URL = '/todos/';
const HTTP_CODE_201_OF_REQUEST_SUCCEEDED = 201;

let firstTodo;

describe(ENDPOINT_URL, () => {

    it('GET' + ENDPOINT_URL, async () => {

        const response = await request(app).get(ENDPOINT_URL);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();

        firstTodo = response.body[0];

    });

    it('GET by Id ' + ENDPOINT_URL + ':todoId', async () => {

        const response = await request(app).get(ENDPOINT_URL + firstTodo._id);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);

    });

    it('GET todoBy id does not exist' + ENDPOINT_URL + ':todoId', async () => {

       const response = await request(app).get(
           ENDPOINT_URL + '611d3beb3d30a0879a00a000'
       );

       expect(response.statusCode).toBe(404);

    });

    it('POST' + ENDPOINT_URL, async () => {

       const response = await request(app)
            .post(ENDPOINT_URL)
            .send(newTodo);

       expect(response.statusCode).toBe(HTTP_CODE_201_OF_REQUEST_SUCCEEDED);
       expect(response.body.title).toBe(newTodo.title);
       expect(response.body.done).toBe(newTodo.done);

    });

    it('should return error 500 on malformed data with POST' + ENDPOINT_URL, async () => {

        const response = await request(app)
            .post(ENDPOINT_URL)
            .send({ title: 'Missing done property' });

        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({
            message: 'Todo validation failed: done: Path `done` is required.'
        });

    });

});
