'use strict';

const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const ENDPOINT_URL = '/todos/';

describe(ENDPOINT_URL, () => {

    it('POST' + ENDPOINT_URL, async () => {

       const response = await request(app)
            .post(ENDPOINT_URL)
            .send(newTodo);

       expect(response.statusCode).toBe(201);
       expect(response.body.title).toBe(newTodo.title);
       expect(response.body.done).toBe(newTodo.done);

    });

});
