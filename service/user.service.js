const { ObjectId } = require("bson");
const GenRepository = require("../commons/database/class/gen-repository");
const md5 = require("md5");
const User= require('../models/user.class.model');
const CustomError = require('../errors/custom-error');
const userRepository = new GenRepository(User); 
module.exports = class UserService {
    
    static async findById(_id){
        const filter = [{
            column: '_id',
            type: 'string',
            value:new ObjectId(_id),
            comparator: '='
        }];
        const result = await userRepository.find({filter});
        if(result.data.length === 0) 
            throw new CustomError('Aucun Utilisateur correspondante')    
        return result.data[0];
    }
    static async findByfilter(filter){    
        const result = await  userRepository.find({filter}); 
        return result;
    }
    static async findByGmail(email){
        const filter = [{
            column: 'email',
            type: 'string',
            value: email,
            comparator: '='
        }];
        const result = await userRepository.find({filter});
        return result.data;
    }
    static async findUserByEmailAndPassword(data){
        const users = await userRepository.find({
            excludeFields: ['password','confirmPassword'],
            filter: [
                {
                    column: 'email',
                    type: 'string',
                    value: data.email,
                    comparator: '='
                },
                {
                    column: 'password',
                    type: 'string',
                    value: md5(data.password),
                    comparator: '='
                },
            ]
        }) 
        if(users.data.length  === 0) return null;
        return users.data[0];
    }

    static buildSigninMail(newUser){
        let societyName = "K-OJAO";
        let mail = {
            to: newUser.email,
            subject: `Bienvenue chez ${societyName}`,
            html: `
                <p>Cher ${newUser.firstName},</p>

                <p>Nous sommes ravis de vous accueillir sur notre site web ${societyName}. Nous sommes un garage qui propose des services de réparation et d'entretien pour les véhicules de toutes marques.</p>
                
                <p>Nous espérons que vous trouverez toutes les informations nécessaires pour prendre soin de votre véhicule sur notre site. N'hésitez pas à nous contacter si vous avez des questions ou si vous souhaitez prendre rendez-vous pour une révision.</p>
                
                <p>En vous inscrivant sur notre site, vous avez accès à des offres exclusives et des réductions sur nos services. N'oubliez pas de vérifier régulièrement votre compte pour ne pas manquer ces opportunités.</p>
                
                <p>Encore une fois, bienvenue chez ${societyName} et nous espérons vous voir bientôt.</p>
                
                <p>Cordialement,</p>
                <p>${societyName}</p>
            `
        };
        return mail;
    }


}