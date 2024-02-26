const express=require("express");
const router= express.Router();
const {liste_mes_clients,liste_mes_reservations,assignereservations,getreservations,createreservations,updatereservations,deletereservations,getreservationsByID,generatereservations}= require("../controllers/reservationController");
const createAuth = require('../middleware/auth');
const createRouteCallback = require('../commons/functions/create-route-callback');

router.route("/").get(getreservations)
router.route('/').post(createreservations)
router.route('/getbyId/:id').get(getreservationsByID)
router.route('/update/:id').put(createAuth([2,3]),updatereservations)
router.route('/:id').delete(createAuth([3]),deletereservations)
//demande de reservation pour client
router.route('/generate').post(createAuth([1,3]),createRouteCallback(generatereservations))
router.route('/assign/:id').post(createAuth([3]),createRouteCallback(assignereservations));
//liste des reservations
router.route('/mes-reservations/').get(createAuth([1,3]),createRouteCallback(liste_mes_reservations));
//listes des reservations dont lequelles je suis assigné
router.route("/mes-clients/").get(createAuth([2,3]),createRouteCallback(liste_mes_clients));
//listes des reservation 

module.exports=router;