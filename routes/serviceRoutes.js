const express=require("express");
const router= express.Router();
const {getServices,createServices,updateServices,deleteServices,getServicesByID}= require("../controllers/serviceController");
const createAuth = require('../middleware/auth');
const createRouteCallback = require('../commons/functions/create-route-callback');
router.route("/").get(createRouteCallback(getServices))
router.route('/').post(createServices)
router.route('/:id').get(getServicesByID)
router.route('/:id').put(createAuth([3]),updateServices)
router.route('/:id').delete(createAuth([3]),deleteServices)
module.exports=router;