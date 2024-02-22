const { body } = require("express-validator");
const Customer = require("./customer.submodel");
const md5 = require("md5");
const bcrypt=require('bcrypt');
class User {
    static collection = "users";
    static schema = {
        "name": {
            type: 'string', 
            required:[true,"le nom est obligatoire"],
            validatorGetter: (paramPropertyName='name')=> 
                body(paramPropertyName).isString().withMessage("Prenom invalide")
        },
        "surname": {
            type: 'string', 
            validatorGetter: (paramPropertyName='surname')=> 
                body(paramPropertyName).isString().withMessage("Nom invalide")
        },
        "password":  {
            type: 'string', 
            validatorGetter: (paramPropertyName='password')=> 
                body(paramPropertyName).isString().withMessage("Mot de passe invalide").customSanitizer(elmt =>md5(elmt))
        },
        "email": {
            type: 'string', 
            validatorGetter: (paramPropertyName='email')=> 
                body(paramPropertyName).isEmail().withMessage("Email invalide").customSanitizer(elmt => elmt.replaceAll(' ', ''))
        },
        "role": {
            type: 'Number'
        }
    }
    static createSchemaDto = (()=> {
        const ans = { ...User.schema,
            "confirmPassword":  {
                type: 'string', 
                validatorGetter: (paramPropertyName='confirmPassword')=> 
                    body(paramPropertyName).isString().withMessage("Confirmation de mot de passe invalide").customSanitizer(elmt => md5(elmt))
            }
        };
        delete ans.role;
        return ans;
    } )() 
    static updateSchemaDto = {...this.schema}
    static loginSchemaDto = {
        "email": {
            type: 'string', 
            validatorGetter: (paramPropertyName='email')=> 
                body(paramPropertyName).isEmail().withMessage("Email invalide")
        },
        "password":  {
            type: 'string', 
            validatorGetter: (paramPropertyName='password')=> 
                body(paramPropertyName).isString().withMessage("Mot de passe invalide")
        },
    }
    static canAccessDto = {
        "roleIds":  {
            type: 'array', 
            validatorGetter: (paramPropertyName='roleId')=> 
                body(paramPropertyName).isArray().withMessage("roleId invalide")
        },
    }
}
module.exports = User;