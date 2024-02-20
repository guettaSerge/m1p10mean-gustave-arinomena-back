const mongoose=require('mongoose');

const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"please the user is  required"],
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"please the name is  required"]
    },
    email:{
        type:String,
        required:[true,"please the email is  required"]
    },
    phone:{
        type:String,
        required:[true,"please the phone nuber is  required"]
    }
},{
    timestamps:true
});
module.exports=mongoose.model('Contact',contactSchema);