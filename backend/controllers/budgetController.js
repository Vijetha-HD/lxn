const Budget = require('../models/Budget');
const mongoose = require('mongoose');




exports.createBudget = async (req, res) => {
      console.log('req.user:', req.user);
    try {
        const budget = new Budget({
            ...req.body,
            createdBy: req.user._id
        });
        await budget.save();
        res.status(201).json(budget);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBudgets = async (req, res) => {
    try {
        const { start, end, category, page = 1, limit = 10 } = req.query;
        const filter = { deleted: false };

        if (start && end) {
            filter.date = { $gte: new Date(start), $lte: new Date(end) };
        }
        if (category) {
            filter.category = category;
        }

        const budgets = await Budget.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ date: -1 });

        res.json(budgets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBudgetById = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget || budget.deleted) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.json(budget);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget || budget.deleted) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        Object.assign(budget, req.body, { updatedBy: req.user._id });
        await budget.save();
        res.json(budget);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget || budget.deleted) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        budget.deleted = true;
        await budget.save();
        res.json({ message: 'Budget soft deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getSummary = async (req, res) => {
    try {
        const { start, end, groupBy='month' } = req.query;
        if (!['month', 'category'].includes(groupBy)) {
            return res.status(400).json({ message: 'Invalid groupBy value' });
        }

        const match = { deleted: false };
        if (start && end) {
            match.date = { $gte: new Date(start), $lte: new Date(end) };
        }

        const groupStage = groupBy === 'month'
            ? {
                _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                totalSpent: { $sum: "$spent" },
                totalAmount: { $sum: "$amount" }
            }
            : {
                _id: "$category",
                totalSpent: { $sum: "$spent" },
                totalAmount: { $sum: "$amount" }
            };

        const summary = await Budget.aggregate([
            { $match: match },
            { $group: groupStage },
            { $sort: { _id: 1 } }
        ]);

        res.json(summary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
