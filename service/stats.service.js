const { query } = require("express-validator");
const GenRepository = require("../commons/database/class/gen-repository");
const { generateDaysOfMonth, generateMonthsOfYear, formatAndTrunc } = require("../commons/functions/gen-date");
const CustomError = require("../errors/custom-error");
const ReservationRepository = require("../repositories/reservation.repo");
const DepensesRepository=require("../repositories/depenses.repo");


const reservationsRepository = new ReservationRepository();
const depensesRepository = new DepensesRepository();

module.exports = class StatsService{
    static caExpensesStatsValidators = [
        query('groupByValueLimit').isISO8601().toDate(),
        query('groupByType').isString(),
    ]
    static async findCaExpensesStats(groupByValueLimit, groupByType){
        let ansDates;
        if(groupByType === "month") ansDates = generateDaysOfMonth(groupByValueLimit);
        else if(groupByType === "year") ansDates = generateMonthsOfYear(groupByValueLimit);
        else throw new CustomError("Parametre de groupe inconnu: "+groupByType); 

        const ca = await reservationsRepository.findChiffreAffairesStats(groupByValueLimit, groupByType);
        const expenses=await depensesRepository.findServicesStats(groupByValueLimit, groupByType);
        const comission=await reservationsRepository.findComissionStats(groupByValueLimit, groupByType);
        const nbrReservation=await reservationsRepository.findNombreReservation(groupByValueLimit, groupByType);
        console.log(expenses)
        const ans = [];
        ansDates.map(elmt => {
            let dateKey;
            if(groupByType === "month") dateKey = formatAndTrunc(elmt, "day");
            if(groupByType === "year") dateKey = formatAndTrunc(elmt, "month");
            const newRow = {};
            const extradepenses= expenses[dateKey] ? expenses[dateKey].amount : 0;
            const valeurComissions=comission[dateKey]? comission[dateKey].amount : 0;
            const chiffreAffaires=ca[dateKey]? ca[dateKey].amount : 0;
            newRow.extradepenses =extradepenses;
            newRow.comission = valeurComissions;
            newRow.depenses=newRow.extradepenses+newRow.comission;
            newRow.chiffreAffaire = chiffreAffaires;
            newRow.benefice=newRow.chiffreAffaire-newRow.depenses;
            newRow.nbrReservation=nbrReservation[dateKey]? nbrReservation[dateKey].amount : 0;
          
            ans.push(newRow);
        })
        console.log(ans)
        return ans;
    }
}