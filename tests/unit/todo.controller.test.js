'use strict';

const TodoController = require('../../controllers/todo.controller');

describe('TodoController.createTodo', () => {

    it('should have a createTodo function', async () => {
       expect(typeof TodoController.createTodo).toBe('function');
    });

}); // describe (TodoController.createTodo)
