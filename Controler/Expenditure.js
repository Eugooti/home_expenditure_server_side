const express = require('express');
const router = express.Router();
const Expenditure = require('../Models/ExpenditureModel');

// CREATE a new expenditure
router.post('/expenditures', async (req, res) => {
    const { name, category,cost } = req.body;

    try {
        const expenditure = await Expenditure.create({ name, category,cost });
        res.status(201).json({ expenditure });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create expenditure' });
    }
});

// READ all expenditures
router.get('/expenditures', async (req, res) => {
    try {
        const expenditures = await Expenditure.findAll();
        res.status(200).json({ expenditures });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve expenditures' });
    }
});

// READ an expenditure by ID
router.get('/expenditures/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const expenditure = await Expenditure.findByPk(id);

        if (!expenditure) {
            return res.status(404).json({ error: 'Expenditure not found' });
        }

        res.status(200).json({ expenditure });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve expenditure' });
    }
});

// UPDATE an expenditure by ID
router.put('/expenditures/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category,cost } = req.body;

    try {
        const expenditure = await Expenditure.findByPk(id);

        if (!expenditure) {
            return res.status(404).json({ error: 'Expenditure not found' });
        }

        expenditure.name = name;
        expenditure.category = category;
        expenditure.cost=cost;

        await expenditure.save();

        res.status(200).json({ expenditure });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update expenditure' });
    }
});

// DELETE an expenditure by ID
router.delete('/expenditures/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const expenditure = await Expenditure.findByPk(id);

        if (!expenditure) {
            return res.status(404).json({ error: 'Expenditure not found' });
        }

        await expenditure.destroy();

        res.status(200).json({ message: 'Expenditure deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete expenditure' });
    }
});

module.exports = router;
