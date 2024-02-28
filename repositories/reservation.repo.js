const GenRepository = require("../commons/database/class/gen-repository");
const { formatAndTrunc } = require("../commons/functions/gen-date");
const { getConnection } = require("../config/dbConnection");
const  Reservations= require("../models/reservation.class.model");
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
module.exports = class  ReservationsRepository extends GenRepository {
    constructor(){
        super(Reservations);
    }

    generateBaseAggrForGroup(groupByValueLimit,groupByType){
        return [
            {
                $addFields: {
                    timePeriod: { $dateToString: {format: vars[groupByType].timePeriodFormat, date: "$daterdv"} },
                    timePeriodForFilter:  { $dateToString: {format: vars[groupByType].timePeriodFormatForFilter, date: "$daterdv"} },
                }
            },
            {
                $match: { timePeriodForFilter: {$eq: formatAndTrunc(groupByValueLimit, groupByType)}}
            },
           
        ]
    } 
    async findChiffreAffairesStats(groupByValueLimit, groupByType){
        const collection = this.getCollection();
        const results= await collection.aggregate([
            ...this.generateBaseAggrForGroup(groupByValueLimit,groupByType),
            {
                $group: {
                    "_id": "$timePeriod",
                    "amount": {$sum: "$prix" }
                }
            }
        ]).toArray();
        const ans = {};
        results.map(elmt=>ans[elmt._id]=elmt)
        console.log(ans)
        return ans;
    }
    async findComissionStats(groupByValueLimit, groupByType){
        const collection = this.getCollection();
        const results= await collection.aggregate([
            ...this.generateBaseAggrForGroup(groupByValueLimit,groupByType),
            {
                $group: {
                    "_id": "$timePeriod",
                    "amount": {$sum: "$comission" }
                }
            }
        ]).toArray();
        const ans = {};
        results.map(elmt=>ans[elmt._id]=elmt)
        console.log(ans)
        return ans;
    }
    async findNombreReservation(groupByValueLimit, groupByType){
        const collection = this.getCollection();
        const results= await collection.aggregate([
            ...this.generateBaseAggrForGroup(groupByValueLimit,groupByType),
            {
                $group: {
                    "_id": "$timePeriod",
                    "amount": {$sum: 1 }
                }
            }
        ]).toArray();
        const ans = {};
        results.map(elmt=>ans[elmt._id]=elmt)
        console.log(ans)
        return ans;
    }
    async findNombreHeureEmployee(groupByValueLimit, groupByType){
        const collection = this.getCollection();
        const results= await collection.aggregate([
            ...this.generateBaseAggrForGroup(groupByValueLimit,groupByType),
            {
                $group: {
                    "_id": {"temps":"$timePeriod","employee":"$employee_id"},
                    "heure": {$sum: "$service.duree" }
                }
            }
        ]).toArray();
        const ans = {};
        results.map(elmt=>ans["heure_travail"]=elmt)
        console.log(ans)
        return ans;
    }
  

}