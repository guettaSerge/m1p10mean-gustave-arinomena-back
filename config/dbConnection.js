"use strict";

const { MongoClient } = require("mongodb");
const env= require('../commons/functions/get-env')

var client;
function getConnection(){
    const dbName =  process.env.MONGO_DBNAME;
    if(!client){
        const url = process.env.MONGO_URL;
        const options =  { useNewUrlParser: true, useUnifiedTopology: true };
        client = new MongoClient(url, options);
        
    }   
   
    return client.db(dbName);
}
const transactionOptions = {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    readPreference: 'primary'
};

module.exports.transactionOptions = transactionOptions;
module.exports.getConnection = getConnection;