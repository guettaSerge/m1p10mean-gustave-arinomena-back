const express=require("express");
const router= express.Router();
const {liste_mes_depenses,generateDepenses,deletedepenses}= require("../controllers/depensesController");
const createAuth = require('../middleware/auth');
const createRouteCallback = require('../commons/functions/create-route-callback');


router.route('/:id').delete(createAuth([3]),deletedepenses)
//demande de reservation pour client
router.route('/generate').post(createAuth([3]),createRouteCallback(generateDepenses))
//liste des depenses
router.route('/').get(createAuth([3]),createRouteCallback(liste_mes_depenses));


module.exports=router;