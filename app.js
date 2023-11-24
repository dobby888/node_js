const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
//const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// sequelize
//     .sync()
//     .then(result => {
//         console.log(result);
//         app.listen(3000);
//     })
//     .catch(err => console.log(err));
//sync:syncs ur model to the database by creating appropriate tables and relations(if we have) for them
app.listen(3000);
//MVC:models views controller:
//separation of concerns: different parts of our code do different things and making sure thatwe clearly know which part of the code is responsible forwhat
// models: represent ur data in ur code, work with ur data(ex:save,fetch)
// views: what user sees, decoupled from ur application code(responsible for rendering the right content in our html doc and sending that back to the user)
// controllers: connecting ur models and ur views: contains the "in-between" logic; "views" doesnt concern with the logic and "models" does so these work with models and save the data or trigger that saved process etc... and also when that fetched data was passed to the views
//routes define which upon which path or for which http method which controller should execute; controller is the thing which defines which model to work and which views to render
//controllers are split across middleware funcitons


