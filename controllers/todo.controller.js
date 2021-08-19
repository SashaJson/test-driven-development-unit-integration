'use strict';

const TodoModel = require('../model/todo.model');
const HTTP_CODE_201_OF_REQUEST_SUCCEEDED = 201;

exports.createTodo = async (req, res, next) => {
    try {
        const createdModel = await TodoModel.create(req.body);
        res.status(HTTP_CODE_201_OF_REQUEST_SUCCEEDED).json(createdModel);
    } catch (err) {
        next(err);
    }
};
