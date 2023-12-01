const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const expenseDetails = sequelize.define('expenseDetails',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
        unique:true
    },
    expName:{
        type: Sequelize.STRING,
        allowNull :false
    },
    expCtgry:{  
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    expAmt:{
        type: Sequelize.BIGINT,
        allowNull:false,
    }
});
module.exports=expenseDetails;