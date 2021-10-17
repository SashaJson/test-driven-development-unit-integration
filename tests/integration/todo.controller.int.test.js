'use strict';

const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const ENDPOINT_URL = '/todos/';
const TEST_DATA = { title: 'Make integration test for PUT', done: true };
const NOT_EXIST_TODO_ID = '611d3beb3d30a0879a00a000';

const HTTP_CODE_200_OK = 200;
const HTTP_CODE_201_OF_CREATED = 201;
const HTTP_CODE_404_OF_NOT_FOUND = 404;
const HTTP_CODE_500_OF_INTERNAL_SERVER_ERROR = 500;

let firstTodo, newTodoId;

describe(ENDPOINT_URL, () => {

    it('GET' + ENDPOINT_URL, async () => {

        const response = await request(app).get(ENDPOINT_URL);
        expect(response.statusCode).toBe(HTTP_CODE_200_OK);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();

        firstTodo = response.body[0];

    });

    it('GET by Id ' + ENDPOINT_URL + ':todoId', async () => {

        const response = await request(app).get(ENDPOINT_URL + firstTodo._id);

        expect(response.statusCode).toBe(HTTP_CODE_200_OK);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);

    });

    it('GET todoBy id does not exist' + ENDPOINT_URL + ':todoId', async () => {

       const response = await request(app).get(
           ENDPOINT_URL + NOT_EXIST_TODO_ID
       );

       expect(response.statusCode).toBe(HTTP_CODE_404_OF_NOT_FOUND);

    });

    it('POST' + ENDPOINT_URL, async () => {

       const response = await request(app)
            .post(ENDPOINT_URL)
            .send(newTodo);

       expect(response.statusCode).toBe(HTTP_CODE_201_OF_CREATED);
       expect(response.body.title).toBe(newTodo.title);
       expect(response.body.done).toBe(newTodo.done);

       newTodoId = response.body._id;

    });

    it('should return error 500 on malformed data with POST' + ENDPOINT_URL, async () => {

        const response = await request(app)
            .post(ENDPOINT_URL)
            .send({ title: 'Missing done property' });

        expect(response.statusCode).toBe(HTTP_CODE_500_OF_INTERNAL_SERVER_ERROR);
        expect(response.body).toStrictEqual({
            message: 'Todo validation failed: done: Path `done` is required.'
        });

    });

    it('PUT' + ENDPOINT_URL, async () => {

        const res = await request(app).put(ENDPOINT_URL + newTodoId).send(TEST_DATA);

        expect(res.statusCode).toBe(HTTP_CODE_200_OK);
        expect(res.body.title).toBe(TEST_DATA.title);
        expect(res.body.done).toBe(TEST_DATA.done);

    });

    it('should return 404 on PUT ' + ENDPOINT_URL, async () => {

        const res = await request(app).put(ENDPOINT_URL + NOT_EXIST_TODO_ID).send(TEST_DATA);
        expect(res.statusCode).toBe(HTTP_CODE_404_OF_NOT_FOUND);

    });

    it('Method DELETE', async () => {

        const res = await request(app).delete(ENDPOINT_URL + newTodoId).send();
        expect(res.statusCode).toBe(HTTP_CODE_200_OK);
        expect(res.body.title).toBe(TEST_DATA.title);
        expect(res.body.done).toBe(TEST_DATA.done);

    });

    it('method DELETE return 404 if todoId does not exist', async () => {

        const res = await request(app).delete(ENDPOINT_URL + NOT_EXIST_TODO_ID).send();
        expect(res.statusCode).toBe(HTTP_CODE_404_OF_NOT_FOUND);

    });

});
