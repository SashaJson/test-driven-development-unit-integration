'use strict';

const TodoModel = require('../model/todo.model');

const HTTP_CODE_200_OK = 200;
const HTTP_CODE_201_OF_CREATED = 201;
const HTTP_CODE_404_OF_NOT_FOUND = 404;

exports.createTodo = async (req, res, next) => {
    try {
        const createdModel = await TodoModel.create(req.body);
        res.status(HTTP_CODE_201_OF_CREATED).json(createdModel);
    } catch (err) {
        next(err);
    }
};

exports.getTodos = async (req, res, next) => {
    try {
        const allTodos = await TodoModel.find({});
        res.status(HTTP_CODE_200_OK).json(allTodos);
    } catch (err) {
        next(err);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const todoModel = await TodoModel.findById(req.params.todoId);
        if (todoModel) {
            res.status(HTTP_CODE_200_OK).json(todoModel);
        } else {
            res.status(HTTP_CODE_404_OF_NOT_FOUND).send();
        }
    } catch (err) {
        next(err);
    }
};

exports.updateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.todoId, req.body, {
            new: true,
            useFindAndModify: false
        });
        if (updatedTodo) {
            res.status(HTTP_CODE_200_OK).json(updatedTodo);
        } else {
            res.status(HTTP_CODE_404_OF_NOT_FOUND).send();
        }
    } catch (err) {
        next(err);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(req.params.todoId);
        if (deletedTodo) {
            res.status(HTTP_CODE_200_OK).json(deletedTodo);
        } else {
            res.status(HTTP_CODE_404_OF_NOT_FOUND).send();
        }
    } catch (err) {
        next(err);
    }
};
