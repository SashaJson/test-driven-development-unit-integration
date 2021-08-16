'use strict';

const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.mode');

TodoModel.create = jest.fn();

describe('TodoController.createTodo', () => {

    it('should have a createTodo function', async () => {

       expect(typeof TodoController.createTodo).toBe('function');

    });

    it('should call TodoModel.create', async () => {

        TodoController.createTodo();
        expect(TodoModel.create()).toBeCalled();

    });

}); // describe (TodoController.createTodo)
