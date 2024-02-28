const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const asyncHandler=require('express-async-handler')
var router = express.Router();
const { ObjectId } = require("bson");
const Depenses=require('../models/depenses.class.model');
const user = require("../models/user.class.model");
const GenRepository = require('../commons/database/class/gen-repository');
const depensesService = require('../service/depenses.services')
const serviceService=require('../service/service.service');
const {assign} = require('../commons/database/methods/gen-reflect');
const CustomError = require('../errors/custom-error');
const depensessService = require('../service/depenses.services');
const DepensesRepository = new GenRepository(Depenses);
const userRepository = new GenRepository(user) 
router.use(cookieParser());


    


//insertion reservations
//@desc create reservation
//@route Post /api/reservations/generate
//@access private
const generateDepenses = asyncHandler(async (req, res) =>{
  const newDepense = assign(Depenses, req.body,'createDepenseShemaDto');
  //test du valeur de données
  if(!newDepense.nom) throw new CustomError("le nom est obligatoire",401);
  if(!newDepense.montant) throw new CustomError("le montant est obligatoire",401);
  if(!newDepense.datedepense) throw new CustomError("la date de depense est obligatoire",401);
  ///verification du date si elle est valide
  let dtRdv=new Date(newDepense.datedepense);
  if(isNaN(dtRdv.getTime())) throw new CustomError("La date de depense n'est pas valide",401);
  newDepense.datedepense=dtRdv
  ///verification du montant
  if(newDepense.montant<0)throw new CustomError("le montant doit être positif")
  await DepensesRepository.insert([newDepense]);
  res.json({message: "nouveau depense inséré avec succès"});
});


//insertion depenses
//@desc create reservation
//@route Post /api/depenses/mes-depenses
//@access private

const liste_mes_depenses = asyncHandler(async (req, res) =>{ 
  result= await depensesService.findCoredepensesbyfilter();
  res.json(result);
});

//@desc  delete employee
//@route Delete /api/depenses/:id
//@access public
const deletedepenses =  asyncHandler(async (req, res) =>{
  const depenses = await depensesService.findCoredepensesById(req.params.id);
  await DepensesRepository.softDelete(req.params.id);
  res.json({message: "Depenses retirée"});
});


module.exports={generateDepenses ,liste_mes_depenses,deletedepenses}