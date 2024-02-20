const express=require("express");
const router= express.Router();
const {getoffres,createoffres,updateoffres,deleteoffres,getoffresByID}= require("../controllers/offreController");
const validateToken = require('../middleware/validateTokenHandler');

router.route("/").get(validateToken,getoffres)
router.route('/').post(validateToken,createoffres)
router.route('/:id').get(getoffresByID)
router.route('/:id').put(updateoffres)
router.route('/:id').delete(deleteoffres)
module.exports=router;