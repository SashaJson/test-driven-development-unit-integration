'use strict';

const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();

let req, res, next;
const HTTP_CODE_201_OF_REQUEST_SUCCEEDED = 201;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('TodoController.getTodos', () => {

    it('should have a getTodos function', () => {
        expect(typeof TodoController.getTodos).toBe('function');
    });

    it('should call TodoModel.find({})', async () => {
        await TodoController.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    });

});

describe('TodoController.createTodo', () => {

    it('should have a createTodo function', () => {

       expect(typeof TodoController.createTodo).toBe('function');

    });

    it('should call TodoModel.create',() => {
        req.body = newTodo;
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);

    });

    it('should return 201 response code',async () => {

        await TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(HTTP_CODE_201_OF_REQUEST_SUCCEEDED);
        expect(res._isEndCalled()).toBeTruthy();

    });

    it('should return json body in response',async () => {

        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);

    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'Done property missing' };
        const rejectPromise = Promise.reject(errorMessage);

        TodoModel.create.mockReturnValue(rejectPromise);
        await TodoController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });

}); // describe (TodoController.createTodo)
