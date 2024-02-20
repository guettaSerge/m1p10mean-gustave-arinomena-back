console.log("Salama eh")
const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv=require('dotenv').config();
var routes= require('./routes');

const connectDb = require('./config/dbConnection');
connectDb();

var app = express();
app.use(bodyParser.json());
const port =process.env.PORT||5000;
app.use(express.json())
app.use(errorHandler);

//assign routes
routes(app)

app.listen(port,()=>{
    console.log(`server: listening on ${port}`);
});
