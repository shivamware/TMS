const express = require('express');
const router = express.Router();
const db = require('../Models');

// POST /subject
router.post('/', async (req, res) => {
  try {
    const subject = await db.Subject.create(req.body);
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /subject
router.get('/', async (req, res) => {
  const subjects = await db.Subject.findAll();
  res.json(subjects);
});

// GET /subject/:id
router.get('/:id', async (req, res) => {
  const subject = await db.Subject.findByPk(req.params.id, { include: db.Trainer });
  if (!subject) return res.status(404).json({ error: 'Subject not found' });
  res.json(subject);
});

module.exports = router;
