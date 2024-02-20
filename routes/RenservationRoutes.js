const express=require("express");
const router= express.Router();
const {getreservations,createreservations,updatereservations,deletereservations,getreservationsByID}= require("../controllers/reservationController");
const validateToken = require('../middleware/auth');

router.route("/").get(getreservations)
router.route('/').post(validateToken,createreservations)
router.route('/:id').get(getreservationsByID)
router.route('/:id').put(updatereservations)
router.route('/:id').delete(deletereservations)
module.exports=router;