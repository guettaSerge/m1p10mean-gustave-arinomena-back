const { ObjectId } = require("bson");
const GenRepository = require("../commons/database/class/gen-repository");
const CustomError = require("../errors/custom-error");
const Sercives = require("../models/service.class.model");

 
const serviceRepository = new GenRepository(Sercives) 
module.exports = class SerciveService {

    static async findCoreServices(params){    
        if(!params.filter) params.filter = []
        const result = await serviceRepository.find(params); 
        return result;
    }
    static async findCoreServiceById(_id){
        const filter = [{
            column: '_id',
            type: 'string',
            value:new ObjectId(_id),
            comparator: '='
        }];
        const result = await serviceRepository.find({filter});
        if(result.data.length === 0) 
            throw new CustomError('Aucune Service correspondante')    
        return result.data[0];
    }
    
    
}