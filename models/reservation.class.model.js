const {body} = require('express-validator'); 

const _id = {
    tyep: 'string',
    validatorGetter: (paramPropertyName='_id')=> body(paramPropertyName).isString().withMessage('Identifiant invalide') 
}
class Reservation {
    static schema ={
        "client": { type: 'object', validatorGetter: (paramPropertyName='client')=> body(paramPropertyName)  },  
        "employee": { type: 'object', validatorGetter: (paramPropertyName='employe')=> body(paramPropertyName)  },
        "service": { type: 'object', validatorGetter: (paramPropertyName='service')=> body(paramPropertyName)  },
        "prix": { type: 'float', validatorGetter: (paramPropertyName='prix')=> body(paramPropertyName).isFloat().withMessage("prix invalide")  },
        "comission": { type: 'float', validatorGetter: (paramPropertyName='comission')=> body(paramPropertyName).isFloat().withMessage("comission invalide")  },
        "status": { type: 'int',  validatorGetter: (paramPropertyName='status')=> body(paramPropertyName).isInt().withMessage("Statut invalide").toInt() },
        "daterdv": { 
            type: 'date',
            required:[true,"la date de rendez-vous est obligatoire"], 
            validatorGetter: (paramPropertyName='daterdv')=> body(paramPropertyName).isISO8601().withMessage("Date d'enregistrement").toDate() },
    }
    static demanderdvShemaDto=(()=> { 
        const ans = { ... this.schema,
            "service_id":  {
                type: 'string', 
                validatorGetter: (paramPropertyName='service_id')=>body(paramPropertyName).isString().withMessage("")
            }
        };
        delete ans.client;
        delete ans.service;
        delete ans.status;
        delete ans.employee;
        delete ans.comission;
        delete ans.prix;
        return ans;}) ();

    static assignerRdvShemaDto=(()=> { 
        const ans = { ... this.schema,
            "employee_id":  {
                type: 'string', 
                validatorGetter: (paramPropertyName='employee_id')=>body(paramPropertyName).isString().withMessage("")
            }
        };
        delete ans.client;
        delete ans.service;
        delete ans.status;
        delete ans.employee;
        delete ans.prix;
        return ans;}) ();

    static createSchemaDto = (()=> { 
        const ans = {...this.schema}; 
        delete ans.status;
        delete ans.daterdv;
        return ans;}) ();
    static updateSchemaDto =  (()=> { 
        const ans = {...this.schema, _id}; 
        delete ans.currentRepair; 
        delete ans.status;
        delete ans.registrationDate;
        return ans;}) ();
    static collection = "reservations";
}

module.exports = Reservation;