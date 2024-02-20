const express=require("express");
const router= express.Router();
const {getemployee,createemployee,updateemployee,deleteemployee, getOneemployee}= require("../controllers/employeeController");
const validateToken = require('../middleware/validateTokenHandler');

router.route("/").get(validateToken,getemployee)
router.route('/').post(validateToken,createemployee)
router.route('/:id').get(getOneemployee)
router.route('/:id').put(updateemployee)
router.route('/:id').delete(deleteemployee)

module.exports=router;