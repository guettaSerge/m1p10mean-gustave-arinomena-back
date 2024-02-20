const mongoose=require('mongoose');

const employeeSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"please the user is  required"],
        ref:"User"
    },
    hierarchy:{
        type:Number,
        required:[true,"please the hierarchy  is  required"]
    }
},{
    timestamps:true
});
module.exports=mongoose.model('Employee',employeeSchema);