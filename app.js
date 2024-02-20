console.log("Salama eh")
const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDb = require('./config/dbConnection');
const dotenv=require('dotenv').config();
var routes= require('./routes');
connectDb();

const app=express();
const port =process.env.PORT||5000;
app.use(express.json())
app.use(errorHandler);

//assign routes
routes(app)

app.listen(port,()=>{
    console.log(`server: listening on ${port}`);
});
