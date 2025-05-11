const express = require('express');
const router = express.Router();
const db = require('../Models');

// POST /trainer
router.post('/', async (req, res) => {
  const { empId, name, subjects } = req.body;
  try {
    const trainer = await db.Trainer.create({ empId, name });
    if (subjects) {
      const subjectRecords = await db.Subject.findAll({ where: { name: subjects } });
      await trainer.addSubjects(subjectRecords);
    }
    res.status(201).json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /trainer
router.get('/', async (req, res) => {
  const trainers = await db.Trainer.findAll({ include: db.Subject });
  res.json(trainers);
});

// DELETE /trainer
router.delete('/', async (req, res) => {
  const { empId } = req.body;
  const result = await db.Trainer.destroy({ where: { empId } });
  res.json({ deleted: result });
});

// GET /trainer/:id
router.get('/:id', async (req, res) => {
  const trainer = await db.Trainer.findByPk(req.params.id, { include: db.Subject });
  if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
  res.json(trainer);
});

// GET /trainer/:subject/topic
router.get('/:subject/topic', async (req, res) => {
  const subject = await db.Subject.findOne({ where: { name: req.params.subject }, include: db.Trainer });
  if (!subject) return res.status(404).json({ error: 'Subject not found' });
  res.json(subject.Trainers);
});

module.exports = router;
