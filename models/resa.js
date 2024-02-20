const mongoose = require('mongoose');

var sch= mongoose.Schema({
    idRdv: { type: String },
    idService: { type: String },
    idEmploye: { type: String },
    dateHeure: { type: Date },
    commission: { type: Number },
    status: { type: String }
});

var Reservations = mongoose.model('Reservations',sch);

module.exports = { Reservations };