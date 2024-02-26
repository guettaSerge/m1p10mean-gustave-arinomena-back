const { ObjectId } = require("bson");
const GenRepository = require("../commons/database/class/gen-repository");
const CustomError = require("../errors/custom-error");
const reservation = require("../models/reservation.class.model");
const user = require("../models/user.class.model");
 

const reservationRepository = new GenRepository(reservation) 

module.exports = class ReservationsService {

    static async findCoreReservation(params){    
        if(!params.filter) params.filter = []
        const result = await reservationRepository.find(params); 
        return result;
    }

    static async findCoreReservationbyfilter(filter){    
        const result = await reservationRepository.find({filter}); 
        return result;
    }
    static async findCoreReservationById(_id){
        const filter = [{
            column: '_id',
            type: 'string',
            value:new ObjectId(_id),
            comparator: '='
        }];
        const result = await reservationRepository.find({filter});
        if(result.data.length === 0) 
            throw new CustomError('Aucun Reservation correspondante')    
        return result.data[0];
    }
    
    
}