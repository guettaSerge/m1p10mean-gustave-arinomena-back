const express=require("express");
const router= express.Router();
const {getreservations,createreservations,updatereservations,deletereservations,getreservationsByID}= require("../controllers/reservationController");
const createAuth = require('../middleware/auth');

router.route("/").get(getreservations)
router.route('/').post(createreservations)
router.route('/:id').get(getreservationsByID)
router.route('/:id').put(createAuth([2,3]),updatereservations)
router.route('/:id').delete(createAuth([3]),deletereservations)
module.exports=router;