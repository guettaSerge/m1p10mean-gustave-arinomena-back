const mongoose = require('mongoose');

const connectDb= async () =>{
    try{
        const connect=await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
        console.log("Connected to MongoDB :",connect.connection.host);
    }
    catch(err){
        console.log(err);
    }
};

module.exports = connectDb;