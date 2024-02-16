const mongoose = require('mongoose');

var sch= mongoose.Schema({
    nom: { type: String },
    prenom: { type: String },
    email: { type: String },
    mdp: { type: String }
});

var Employees = mongoose.model('Employees',sch);

module.exports = { Employees };