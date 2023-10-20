const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.post('/', (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(400).json({ error: 'Bad Request' });
    });
});

router.get('/:id', (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.put('/:id', (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.update(req.body).then((updatedUser) => {
        res.json(updatedUser);
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.delete('/:id', (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.destroy().then(() => {
        res.status(204).send();
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
