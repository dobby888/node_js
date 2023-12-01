const fs = require('fs').promises;
const expenseDetails = require('../models/expenseDetails');

exports.getExpenseFormPage = async (request, response, next) => {
    try {
        await response.sendFile('index.html', { root: 'views/expense' });
    } catch (err) {
        console.log("Error in getuserform page", err);
    }
}

exports.addExpenserDetails = async (request, response, next) => {
    try {
        const { expName, expCtgry, expAmt} = request.body;

        await expenseDetails.create({
            expName: expName,
            expCtgry: expCtgry,
            expAmt: expAmt
        });

        response.redirect('/user/expenses');
    } catch (err) {
        console.log("Error while adding the details of a new Expense", err);
    }
}

exports.getAllExpensesDetails = async (request, response, next) => {
    try {
        const data = await expenseDetails.findAll();
        response.json(data);
    } catch (err) {
        console.log("Error while fetching all expenses Details", err);
    }
}

exports.deleteExpenseDetails = async (request, response, next) => {
    const dID = request.params.dID;

    try {
        await expenseDetails.destroy({
            where: {
                id: dID
            }
        });
 
        response.redirect('/user/expenses');
    } catch (err) {
        console.log("Error while deleting expense Details with id: ", dID, err);
    } 
}

exports.editExpenseDetails = async (request, response, next) => {
    const eID = request.params.eID;

    try {
        const uniqueProduct = await expenseDetails.findByPk(eID);

        response.send(uniqueProduct);
    } catch (error) {
        console.log('Error in editExpenseDetails:', error);
        console.log(error);
    }
}
