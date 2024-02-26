const { ObjectId } = require("bson");
const GenRepository = require("../commons/database/class/gen-repository");
const CustomError = require("../errors/custom-error");
const preferenceServices = require("../models/PreferenceServices.class.model");
const user = require("../models/user.class.model");
 

const preferenceServicesRepository = new GenRepository(preferenceServices) 

module.exports = class PreferencesServicesService {

    static async findCoreReservation(params){    
        if(!params.filter) params.filter = []
        const result = await preferenceServicesRepository.find(params); 
        return result;
    }

    static async findCoreReservationbyfilter(filter){    
        const result = await preferenceServicesRepository.find({filter}); 
        return result;
    }
    static async findCoreReservationById(_id){
        const filter = [{
            column: '_id',
            type: 'string',
            value:new ObjectId(_id),
            comparator: '='
        }];
        const result = await preferenceServicesRepository.find({filter});
        if(result.data.length === 0) 
            throw new CustomError('Aucun Preference employee correspondante')    
        return result.data[0];
    }
    
    
}