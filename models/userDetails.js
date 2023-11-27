const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const userDetails = sequelize.define('userDetails',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
        unique:true
    },
    uName:{
        type: Sequelize.STRING,
        allowNull :false
    },
    emailId:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    phoneNo:{
        type: Sequelize.STRING,
        allowNull:false,
    }
});
module.exports=userDetails;