// routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Create a new Todo
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    return res.status(201).json(todo);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create Todo' });
  }
});

// Get all Todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch Todos' });
  }
});

// Update a Todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.update(req.body);
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update Todo' });
  }
});

// Delete a Todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete Todo' });
  }
});

module.exports = router;
