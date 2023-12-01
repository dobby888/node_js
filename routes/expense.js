const express = require('express');
const expenseController = require('../controllers/expense');

const router = express.Router();
 
router.get('/expenses',expenseController.getExpenseFormPage);
router.post('/expenses',expenseController.addExpenserDetails);
router.get('/expenses/data',expenseController.getAllExpensesDetails) 
router.get('/expenses/delete/:dID',expenseController.deleteExpenseDetails);
router.get('/expenses/edit/:eID',expenseController.editExpenseDetails);

module.exports = router;