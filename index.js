const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var utilisateurController = require('./controllers/utilisateurController.js');
var employeeController = require('./controllers/employeeController.js');
var serviceController = require('./controllers/serviceController.js');
var reservationController = require('./controllers/reservationController.js');

var app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('Server started at port : 3000'));


app.use('/utilisateur', utilisateurController);
app.use('/employee', employeeController);
app.use('/service', serviceController);
app.use('/resa', reservationController);