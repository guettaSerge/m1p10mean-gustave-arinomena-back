const {body} = require('express-validator'); 
const _id = {
    type: 'string',
    validatorGetter: (paramPropertyName='_id') => body(paramPropertyName).isString()
}
class Service {
    static schema ={
        nom: { type: String,validatorGetter: (paramPropertyName='nom')=> body(paramPropertyName).isString().notEmpty().withMessage("le nom du service invalides") },
        description: { type: String,validatorGetter: (paramPropertyName='nom')=> body(paramPropertyName).isString().notEmpty().withMessage("la description du service invalides")},
        prix: { type: Number,validatorGetter: (paramPropertyName='prix')=> body(paramPropertyName).isFloat({ min:0}).withMessage("Prix du service invalide").toFloat() },
        duree: { type: Number,validatorGetter: (paramPropertyName='progression')=> body(paramPropertyName).isInt().withMessage("Durée du service invalide").toInt()}
    }
    static createSchemaDto = {...this.schema};
    static updateSchemaDto = {...this.schema, _id};
    static collection = "services";
}

module.exports = Service; 