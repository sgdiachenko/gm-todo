const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const todosRoutes = require('./routes/todos');

const app = express();

mongoose.connect("mongodb+srv://admin:eU9qZZdw84JXl9If@cluster0.h9ueb.mongodb.net/todo?retryWrites=true&w=majority")
	.then(() => console.log('Connected to database!'))
	.catch(() => console.log('Connection failed!'));

app.use(bodyParser.json());

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
	next();
});

app.use('/api/todos', todosRoutes);

module.exports = app;
