const mongoose = require('mongoose');

var sch = new mongoose.Schema({
    nom: { type: String },
    prenom: { type: String },
    mail: { type: String },
    mdp: { type: String },
    dateDeNaissance: { type: Date },
});

var Utilisateurs = mongoose.model('utilisateur', sch);

module.exports = { Utilisateurs };