const express=require("express");
const router= express.Router();
const {getServices,createServices,updateServices,deleteServices,getServicesByID}= require("../controllers/serviceController");
const validateToken = require('../middleware/auth');

router.route("/").get(validateToken,getServices)
router.route('/').post(validateToken,createServices)
router.route('/:id').get(getServicesByID)
router.route('/:id').put(updateServices)
router.route('/:id').delete(deleteServices)
module.exports=router;