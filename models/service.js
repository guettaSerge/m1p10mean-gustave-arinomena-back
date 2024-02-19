const mongoose = require('mongoose');

var sch= mongoose.Schema({
    nom: { type: String },
    description: { type: String },
    prix: { type: Number },
    duree: { type: Number }
});

var Services = mongoose.model('Services',sch);

module.exports = { Services };