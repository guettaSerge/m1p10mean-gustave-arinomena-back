console.log("Salama eh")
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var routes= require('./routes');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors({
  origin: function (origin, callback) {
    // Vérifiez ici si l'origine est autorisée à accéder à votre API
      callback(null, true);
  },
  credentials: true // Autorise les en-têtes d'identification à être envoyés dans la demande
}));
//assign routes
routes(app)
const port =process.env.PORT||5000;

app.use(express.static("m1p10mean-serge-arinomena/browser"));

app.listen(port,()=>{
    console.log(`server: listening on ${port}`);
});