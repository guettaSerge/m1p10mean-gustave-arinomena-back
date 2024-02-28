const express=require("express");
const router= express.Router();
const {getStatistiques,gettempstravail}= require("../controllers/StatistiquesController");
const createAuth = require('../middleware/auth');
const createRouteCallback = require('../commons/functions/create-route-callback');
router.route("/get-stats").get(createAuth([3]),createRouteCallback(getStatistiques))
router.route("/get-nombre-travail").get(createAuth([3]),createRouteCallback(gettempstravail))
module.exports=router;