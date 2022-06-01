const express = require('express');

const Todo = require('../models/todo');

const router = express.Router();

router.get('', (req, res, next) => {
  Todo.find().then(result => {
    res.status(200).json(result);
  });
});

router.post('', (req, res, next) => {
  const todo = new Todo({
    title: req.body.title,
    endDate: req.body.endDate ? new Date(req.body.endDate).getTime() : null
  });

  todo.save().then(result => {
    res.status(201).json(result);
  });
});

router.put('/:id', (req, res, next) => {
  const todo = new Todo({
    _id: req.params.id,
    title: req.body.title,
    endDate: req.body.endDate ? new Date(req.body.endDate).getTime() : null
  });

  Todo.updateOne({_id: req.params.id}, todo).then(result => {
    res.status(200).json(result);
  });
});

router.delete('/:id', (req, res, next) => {
  Todo.deleteOne({_id: req.params.id}).then(() => {
    res.status(200).json();
  });
});

module.exports = router;
