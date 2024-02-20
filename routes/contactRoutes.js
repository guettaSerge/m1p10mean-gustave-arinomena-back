const express=require("express");
const router= express.Router();
const {getcontact,createcontact,updatecontact,deletecontact, getOnecontact}= require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');

router.route("/").get(validateToken,getcontact)
router.route('/').post(validateToken,createcontact)
router.route('/:id').get(getOnecontact)
router.route('/:id').put(updatecontact)
router.route('/:id').delete(deletecontact)

module.exports=router;