console.log("Salama eh")
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


var app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());

//assign routes
var routes= require('./routes');
routes(app)

const port =process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`server: listening on ${port}`);
});
