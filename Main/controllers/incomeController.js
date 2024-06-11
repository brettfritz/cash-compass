const express = require('express');
const { Income } = require('../models');
const router = express.Router();

// POST route for adding new income
router.post('/', async (req, res) => {
    try {
        const income = await Income.create(req.body);
        res.status(201).json(income);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT route for updating income details
router.put('/:id', async (req, res) => {
    try {
        const updatedIncome = await Income.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(200).json(updatedIncome);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE route for deleting an income
router.delete('/:id', async (req, res) => {
    try {
        await Income.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Income deleted' });
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET route for seeing all income entries
router.get('/', async (req, res) => {
    try {
        const incomes = await Income.findAll();
        res.status(200).json(incomes);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
