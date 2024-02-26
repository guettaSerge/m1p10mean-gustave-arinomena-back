const express=require("express");
const router= express.Router();
const {createPreferenceServices,getpreferenceServices}= require("../controllers/PreferenceServicesController");

const createAuth = require('../middleware/auth');
const createRouteCallback = require('../commons/functions/create-route-callback');


//get all preferences
router.route('/').get(createAuth([2,3]),createRouteCallback(getpreferenceServices));
//create preferences Services
router.route('/').post(createAuth([1,3]),createRouteCallback(createPreferenceServices));


module.exports=router;