const {body} = require('express-validator'); 

const _id = {
    tyep: 'string',
    validatorGetter: (paramPropertyName='_id')=> body(paramPropertyName).isString().withMessage('Identifiant invalide') 
}
class Depenses {
    static schema ={
        "nom": { type: 'String', validatorGetter: (paramPropertyName='String')=> body(paramPropertyName).isString().withMessage("nom invalide") },
        "montant": { type: 'float', validatorGetter: (paramPropertyName='prix')=> body(paramPropertyName).isFloat().withMessage("montant invalide")  },
        "datedepense": { 
            type: 'Date',
            required:[true,"la date du depense est obligatoire"], 
            validatorGetter: (paramPropertyName='datedepense')=> body(paramPropertyName).isISO8601().withMessage("Date d'enregistrement").toDate() },
    }
    static depensesShemaDto=(()=> { 
        const ans = { ... this.schema
        };
        return ans;}) ();

    static createDepenseShemaDto=(()=> { 
        const ans = { ... this.schema
        };
        return ans;}) ();

   
    static collection = "depenses";
}

module.exports = Depenses;