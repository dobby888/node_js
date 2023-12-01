const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');

const expenseRouter = require('./routes/expense');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use('/user',expenseRouter);


async function initiate(){
    try{
        await sequelize.sync();
        app.listen(8000,()=>{ 
            console.log("Server started");
        })

    }catch(err){
        console.log("error", err);
    }
}
initiate();