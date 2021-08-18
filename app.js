'use strict';

const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const mongodb = require('./mongodb/mongodb.connect');

mongodb.connect();

const app = express();

app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
    res.json('Hello world');
});

module.exports = app;
