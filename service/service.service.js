const { ObjectID } = require("bson");
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

    
    
}