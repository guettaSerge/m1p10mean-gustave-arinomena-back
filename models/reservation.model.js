const mongoose = require('mongoose');

var sch= mongoose.Schema({
    idService: { 
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"please the user is  required"],
        ref:"Service"
     },
    idUser: {
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"please the user is  required"],
        ref:"User"
    },
    idEmployee: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    dateHeure: { 
        type: Date,
        required:[true,"la date du reservation est obligatoire"],
    },
    prixService: { 
        type: Number ,
        required:[true,"le  prix du service est obligatoire"],
    },
    commission: { 
        type: Number ,
        required:[true,"la comission est obligatoire"],
    },
    status: { type: String }
});

var Reservations = mongoose.model('Reservations',sch);

module.exports = { Reservations };