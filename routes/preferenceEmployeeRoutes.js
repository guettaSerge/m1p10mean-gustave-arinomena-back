const express=require("express");
const router= express.Router();
const {createPreferenceEmployee,getpreferenceEmployee}= require("../controllers/PreferenceEmlpoyeeController");

const createAuth = require('../middleware/auth');
const createRouteCallback = require('../commons/functions/create-route-callback');


//get all preferences
router.route('/').get(createAuth([2,3]),createRouteCallback(getpreferenceEmployee));
//create preferences employee
router.route('/').post(createAuth([1,3]),createRouteCallback(createPreferenceEmployee));


module.exports=router;