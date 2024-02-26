const {body} = require('express-validator'); 

const _id = {
    tyep: 'string',
    validatorGetter: (paramPropertyName='_id')=> body(paramPropertyName).isString().withMessage('Identifiant invalide') 
}
class PreferenceService{
    static schema ={
        "services": { type: 'object', validatorGetter: (paramPropertyName='employe')=> body(paramPropertyName)  },
        "client": { type: 'object', validatorGetter: (paramPropertyName='employe')=> body(paramPropertyName)  },
        "note": { type: 'int',  validatorGetter: (paramPropertyName='status')=> body(paramPropertyName).isInt().withMessage("Statut invalide").toInt() },
        "datepref": { 
            type: 'date',
            required:[true,"la date de rendez-vous est obligatoire"], 
            validatorGetter: (paramPropertyName='daterdv')=> body(paramPropertyName).isISO8601().withMessage("Date d'enregistrement").toDate() },
    }
    static demandeprefServicesShemaDto=(()=> { 
        const ans = { ... this.schema,
            "services_id":  {
                type: 'string', 
                validatorGetter: (paramPropertyName='service_id')=>body(paramPropertyName).isString().withMessage("")
            }
        };
        delete ans.client;
        delete ans.employee;
        delete ans.datepref;
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
    static collection = "preferenceServices";
}

module.exports = PreferenceService;