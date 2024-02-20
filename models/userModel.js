const mongoose=require('mongoose');
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
    }
},{
    timestamps:true
});
module.exports=mongoose.model('User',userSchema);