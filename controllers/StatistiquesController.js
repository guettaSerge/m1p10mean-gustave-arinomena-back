const express = require('express');
const CustomError = require('../errors/custom-error');
const cookieParser = require('cookie-parser');
const asyncHandler=require('express-async-handler')
var router = express.Router();
const statsService=require('../service/stats.service');
router.use(cookieParser());
const ReservationsService = require('../service/reservations.services');
const ReservationsRepository = require('../repositories/reservation.repo');
const reservationrep=new ReservationsRepository();
// lien a utiliser pour le test sur postman: localhost:3000/service/

//@desc register user
//@route Post /api/services/
//@access public
const getStatistiques = asyncHandler(async (req, res) =>{
  //test du valeur de données
  if(!req.body.type) throw new CustomError("veuillez remplir le type",401);
  if(!req.body.date) throw new CustomError("la date  est obligatoire",401);
  ///verification du date si elle est valide
  let dtRdv=new Date(req.body.date);
  if(isNaN(dtRdv.getTime())) throw new CustomError("La date de rendez-vous n'est pas valide",401);
  result= await statsService.findCaExpensesStats(dtRdv,req.body.type)
  res.json(result);
});

const gettempstravail = asyncHandler(async (req, res) =>{
  //test du valeur de données
  if(!req.body.type) throw new CustomError("veuillez remplir le type",401);
  if(!req.body.date) throw new CustomError("la date  est obligatoire",401);
  ///verification du date si elle est valide
  let dtRdv=new Date(req.body.date);
  if(isNaN(dtRdv.getTime())) throw new CustomError("La date de rendez-vous n'est pas valide",401);
  result= await reservationrep.findNombreHeureEmployee(dtRdv,req.body.type);
  res.json(result);
});

  module.exports={getStatistiques,gettempstravail}