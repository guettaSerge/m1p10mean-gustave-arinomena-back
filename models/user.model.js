const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please the name is  required"]
    },
    surname:{
        type:String,
        required:[true,"please the surname is  required"]
    },
    email:{
        type:String,
        required:[true,"please the email is  required"]
    },
    password:{
        type:String,
        required:[true,"please the password is  required"]
    },
    role: {
        type:Number,
        required:[true,"please the role is  required"]
    },
},{
    timestamps:true
});

// Ajouter un champ virtuel pour la confirmation de mot de passe
userSchema.virtual('confirmPassword')
    .get(function () {
        return this._confirmPassword;
    })
    .set(function (value) {
        this._confirmPassword = value;
    });

// Valider la confirmation de mot de passe
userSchema.path('password').validate(async function (value) {
    if (this.isNew) { // Ne s'applique que lors de la création d'un nouvel utilisateur
        return await bcrypt.compare(this._confirmPassword,value)
        console.log(value);
        console.log(this._confirmPassword);
    }
    return true; // Ignorer la validation lors de la mise à jour de l'utilisateur
}, 'Passwords do not match');


module.exports=mongoose.model('User',userSchema);