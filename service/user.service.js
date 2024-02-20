const User= require('../models/user.model');
const bcrypt=require('bcrypt');
const CustomError = require('../errors/custom-error');

module.exports = class UserService {
    
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