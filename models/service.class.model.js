const { body } = require("express-validator");
const Customer = require("./customer.submodel");
const md5 = require("md5");
const bcrypt=require('bcrypt');
class Service {
    static collection = "services";
    static schema = {
        nom: { type: String,validatorGetter: (paramPropertyName='nom')=> body(paramPropertyName).isString().notEmpty().withMessage("le nom du service invalides") },
        description: { type: String,validatorGetter: (paramPropertyName='nom')=> body(paramPropertyName).isString().notEmpty().withMessage("la description du service invalides")},
        prix: { type: Number,validatorGetter: (paramPropertyName='prix')=> body(paramPropertyName).isFloat({ min:0}).withMessage("Prix du service invalide").toFloat() },
        duree: { type: Number,validatorGetter: (paramPropertyName='progression')=> body(paramPropertyName).isInt().withMessage("Durée du service invalide").toInt()}
    }
    static createSchemaDto = (()=> {
        const ans = { ...this.schema,
        };
        return ans;
    } )() 
    static updateSchemaDto = {...this.schema}
}
module.exports = Service;

