const express=require("express");
const router= express.Router();
const {getServices,createServices,updateServices,deleteServices,getServicesByID}= require("../controllers/serviceController");
const createAuth = require('../middleware/auth');
const createRouteCallback = require('../commons/functions/create-route-callback');
router.route("/").get(createRouteCallback(getServices))
router.route('/').post(createRouteCallback(createServices))
router.route('/:id').get(createRouteCallback(getServicesByID))
router.route('/:id').put(createRouteCallback(updateServices))
router.route('/:id').delete(createRouteCallback(deleteServices))
module.exports=router;