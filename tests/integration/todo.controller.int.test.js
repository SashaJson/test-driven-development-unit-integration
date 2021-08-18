'use strict';

const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const ENDPOINT_URL = '/todos/';
const HTTP_CODE_201_OF_REQUEST_SUCCEEDED = 201;

describe(ENDPOINT_URL, () => {

    it('POST' + ENDPOINT_URL, async () => {

       const response = await request(app)
            .post(ENDPOINT_URL)
            .send(newTodo);

       expect(response.statusCode).toBe(HTTP_CODE_201_OF_REQUEST_SUCCEEDED);
       expect(response.body.title).toBe(newTodo.title);
       expect(response.body.done).toBe(newTodo.done);

    });

});
