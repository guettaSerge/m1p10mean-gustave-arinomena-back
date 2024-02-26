const { ObjectId } = require("bson");
const GenRepository = require("../commons/database/class/gen-repository");
const CustomError = require("../errors/custom-error");
const preferenceEmployee = require("../models/PreferenceEmloyee.class.model");
const user = require("../models/user.class.model");
const preferenceEmployeeRepository = new GenRepository( preferenceEmployee) 

module.exports = class ReservationsService {

    static async findCoreReservation(params){    
        if(!params.filter) params.filter = []
        const result = await reservationRepository.find(params); 
        return result;
    }

    static async findCoreReservationbyfilter(filter){    
        const result = await preferenceEmployeeRepository.find({filter}); 
        return result;
    }
    static async findCoreReservationById(_id){
        const filter = [{
            column: '_id',
            type: 'string',
            value:new ObjectId(_id),
            comparator: '='
        }];
        const result = await preferenceEmployeeRepository.find({filter});
        if(result.data.length === 0) 
            throw new CustomError('Aucun Preference employee correspondante')    
        return result.data[0];
    }
    
    
}