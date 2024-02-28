const GenRepository = require("../commons/database/class/gen-repository");
const { formatAndTrunc } = require("../commons/functions/gen-date");
const { getConnection } = require("../config/dbConnection");
const  Depenses= require("../models/depenses.class.model");
const vars = {
    "year": {
        timePeriodFormat: "%Y-%m",
        timePeriodFormatForFilter: "%Y",
    },
    "month": {
        timePeriodFormat: "%Y-%m-%d",
        timePeriodFormatForFilter: "%Y-%m",
    }
}
module.exports = class  DepensesRepository extends GenRepository {
    constructor(){
        super(Depenses);
    }

    generateBaseAggrForGroup(groupByValueLimit,groupByType){
        return [
            {
                $addFields: {
                    timePeriod: { $dateToString: {format: vars[groupByType].timePeriodFormat, date: "$datedepense"} },
                    timePeriodForFilter:  { $dateToString: {format: vars[groupByType].timePeriodFormatForFilter, date: "$datedepense"} },
                }
            },
            {
                $match: { timePeriodForFilter: {$eq: formatAndTrunc(groupByValueLimit, groupByType)}}
            },
           
        ]
    } 
    async findServicesStats(groupByValueLimit, groupByType){
        const collection = this.getCollection();
        const results= await collection.aggregate([
            ...this.generateBaseAggrForGroup(groupByValueLimit,groupByType),
            {
                $group: {
                    "_id": "$timePeriod",
                    "amount": {$sum: "$montant" }
                }
            }
        ]).toArray();
        const ans = {};
        results.map(elmt=>ans[elmt._id]=elmt)
        console.log(ans)
        return ans;
    }
  

}