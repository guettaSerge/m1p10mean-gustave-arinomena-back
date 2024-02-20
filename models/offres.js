const mongoose = require('mongoose');

var sch= mongoose.Schema({
    idService: { type: String },
    pourcentageDeReduction: { type: Number },
    dateDebut: { type: Date },
    dateFin: { type: Date }
});

var Offres = mongoose.model('Offres',sch);

module.exports = { Offres };