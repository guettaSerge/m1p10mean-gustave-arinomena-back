const { ObjectId } = require("bson");
const GenRepository = require("../commons/database/class/gen-repository");
const CustomError = require("../errors/custom-error");
const Depenses = require("../models/depenses.class.model");
const user = require("../models/user.class.model");
 

const depensesRepository = new GenRepository(Depenses) 

module.exports = class depensessService {

    static async findCoredepenses(params){    
        if(!params.filter) params.filter = []
        const result = await depensesRepository.find(params); 
        return result;
    }

    static async findCoredepensesbyfilter(filter){    
        const result = await depensesRepository.find({filter}); 
        return result;
    }
    static async findCoredepensesById(_id){
        const filter = [{
            column: '_id',
            type: 'string',
            value:new ObjectId(_id),
            comparator: '='
        }];
        const result = await depensesRepository.find({filter});
        if(result.data.length === 0) 
            throw new CustomError('Aucun depenses correspondante')    
        return result.data[0];
    }
    
    
}