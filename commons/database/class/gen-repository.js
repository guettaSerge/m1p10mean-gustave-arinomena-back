const { ObjectID } = require("bson");
const { getConnection } = require("../../../config/dbConnection"); 
const CustomError = require("../../../errors/custom-error");
const { assign } = require("../methods/gen-reflect");

class GenRepository {
    entityClass;
    constructor(entityClass){
        this.entityClass = entityClass;
    } 
    getCollection(){
        return getConnection().collection(this.entityClass.collection)
    }
    /**
     * 
     * @param {any[]} entities 
     * @returns any
     */
    async insert(entities, schemaName='schema'){
        //const toInsert  = entities.map(elmt=> assign(this.entityClass, elmt, schemaName));
        try{
            const toInsert = entities;
            const collection = getConnection().collection(this.entityClass.collection);
            return await collection.insertMany(toInsert);    
        }catch(e){
            let message = "Erreur lors de l'insertion";
            console.log(e);
            if(e.message) message = e.message;
            throw new CustomError(message);
        }
    }

    /**
     * 
     * @param {{
     * 
     *  excludeFields?: string[],
     *  pagination?: {
     *              page: string, 
    *               pageElmtCount: string,
    *               orderBy: {column: string, order: 'asc'|'desc'}[]
     *          },
     *  filter?:[
     *      {
     *          column: string, 
     *          value: string,
     *          type: string,
     *          comparator: string
     *      }
     *  ],
     * filterMode: 'and' | 'or'
     * }} options 
     * @returns any[]
     * 
     * pagination[page] is a string because of queryParams
     */
    async find(params){
        let projection ={};
        if(params.excludeFields){
            params.excludeFields.forEach(element => {
                projection[element]=0;
           });
        }
        let queryOptions = {}; 
        let createPaginationOptions = this.createPaginationOptions(params.pagination);
        queryOptions = {...queryOptions, ...createPaginationOptions};
      
      
        const filters = this.createMatchOptions(params.filter, params.filterMode)
        console.log(JSON.stringify(filters))
        const collection = this.getCollection();
        const results = await collection.find(filters,queryOptions).project(projection).toArray();
         
        const ans =  {
            data: results
                .map(elmt => Object.assign(new this.entityClass, elmt)),
            meta: {
                totalElmtCount: (await collection.countDocuments(filters))
            }
        };
        console.log(ans)
        return ans;
    }

    async findById(_id){
        const filter = [{
            column: '_id',
            type: 'string',
            value: ObjectID(_id),
            comparator: '='
        }];
        const result = await this.find({filter});
        if(result.data.length === 0) return null;
        return result.data[0];
    }


    createPaginationOptions(pagination){ 
        if(pagination == null) return {};
        if( pagination.orderBy == null) pagination.orderBy = [];
        pagination.orderBy.push({column: '_id', order: 'asc'});
        const ans = {
            limit: +pagination.pageElmtCount,
            skip: pagination.pageElmtCount * (pagination.page-1),
            sort: pagination.orderBy.map(elmt => [elmt.column, elmt.order])
        } ;
       
        return ans;
    }
    
    async update(entity) {
        const collection = getConnection().collection(this.entityClass.collection);
        const id = entity._id;
        delete entity._id;
        return await collection.updateOne({_id: ObjectID(id)}, {$set: entity});
    }

    async delete(id){
        const collection = getConnection().collection(this.entityClass.collection);
        return await collection.deleteOne({_id: ObjectID(id)});
    }

    createMatchOptions(filters, filterMode){
        if(!filters || filters.length === 0) return {}
        const comparators = {
            "=": "$eq",
            "<": "$lt",
            ">": "$gt",
            "<=": "$lte",
            ">=": "$gte",
            "exists" : "$exists",
            "!=": '$ne'
        };
        
       const ans = filters.map(filter => {
            const value=this.parseValue(filter.value, filter.type);
            if(filter.comparator === "like"){
                return {[filter.column]:{'$regex': value, '$options': 'i' }};
            }if(filter.comparator === "notExistsOrNull"){
                return {'$or': [ { [filter.column]:{$exists: false}}, { [filter.column]:{$eq: null}}] };
            }
            const f = {[filter.column]: { [comparators[filter.comparator]]: value}};
            return f;
        })
        return { [filterMode ==='or'?'$or': '$and']: ans };
    }
    parseValue(value, type){
        if(type === "int" || type === "float" || type === "number")
            return +value;
        if(type === "date")
            return new Date(value);
        return value;
    }
    async softDelete(id){
        const collection = this.getCollection();
        const deletedAt = new Date();
        return await collection.updateOne({_id: ObjectID(id)}, {$set: {deletedAt}});
    }
}

module.exports = GenRepository;