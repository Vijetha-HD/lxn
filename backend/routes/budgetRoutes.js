const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { budgetSchema } = require('../validators/budgetValidator');
const { createBudget, getBudgets, getBudgetById, updateBudget, deleteBudget, getSummary } = require('../controllers/budgetController');
const validate = require('../middleware/validate');

// Create budget
router.post('/', authenticateToken, authorizeRoles('Campaign Manager'), validate(budgetSchema), createBudget);

// // Create budget without auth
// router.post('/', authorizeRoles('Campaign Manager'), validate(budgetSchema), createBudget);

// Summary aggregation
// Summary aggregation - must come BEFORE `/:id`
router.get('/summary', authenticateToken, getSummary);

// List budgets
router.get('/', authenticateToken, getBudgets);

// Get single budget
router.get('/:id', authenticateToken, getBudgetById);

// Update budget
router.put('/:id', authenticateToken, authorizeRoles('Campaign Manager'), validate(budgetSchema), updateBudget);

// Soft delete budget
router.delete('/:id', authenticateToken, authorizeRoles('Campaign Manager'), deleteBudget);






module.exports = router;
