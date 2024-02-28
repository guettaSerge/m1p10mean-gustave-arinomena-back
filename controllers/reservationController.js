const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const asyncHandler=require('express-async-handler')
var router = express.Router();
const { ObjectId } = require("bson");
const Reservations=require('../models/reservation.class.model');
const user = require("../models/user.class.model");
const GenRepository = require('../commons/database/class/gen-repository');
const reservationsService = require('../service/reservations.services')
const serviceService=require('../service/service.service');
const {assign} = require('../commons/database/methods/gen-reflect');
const CustomError = require('../errors/custom-error');
const reservationsRepository = new GenRepository(Reservations);
const userRepository = new GenRepository(user) 
router.use(cookieParser());


// lien a utiliser pour le test sur postman: localhost:3000/service/

//@desc register user
//@route get /api/reservations/
//@access public
const getreservations = asyncHandler(async (req, res) =>{
  try {
    const docs = await Reservations.find();
    res.send(docs);
  } catch (err) {
    console.log("Une erreur dans la récupération des données de la reservation :" + JSON.stringify(err, undefined, 2));
  }
});


//@desc get one reservation
//@route Post /api/reservations/:id
//@access public
const getreservationsByID = asyncHandler(async (req, res) =>{
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`Aucun enregistrement avec l'identifiant donné : ${req.params.id}`);
    }

    const reservation = await Reservations.findById(req.params.id);

    if (!reservation) {
      return res.status(404).send(`Aucun reservation trouvé avec l'identifiant : ${req.params.id}`);
    }

    res.send(reservation);
  } catch (err) {
    console.error("Erreur lors de la récupération de la reservation :", err);
    res.status(500).send('Erreur interne du serveur');
  }
});
    
//insertion reservations
//@desc create reservation
//@route Post /api/reservations
//@access private
const createreservations = asyncHandler(async (req, res) =>{
  const newReservation = assign(Reservations, req.body,'demanderdvShemaDto');
  newReservation.client=req.user
  newReservation.service=serviceService.findCoreServiceById(newReservation.service.id);
  newReservation.prix=newReservation.service.prix;
  await reservationsRepository.insert([body]);
  res.json({message: "nouveau service inserée"});
});

//insertion reservations
//@desc create reservation
//@route Post /api/reservations/generate
//@access private
const generatereservations = asyncHandler(async (req, res) =>{
  const newReservation = assign(Reservations, req.body,'demanderdvShemaDto');
  //test du valeur de données
  if(!newReservation.service_id) throw new CustomError("vous devez choisir une service",401);
  if(!newReservation.daterdv) throw new CustomError("la date du rendez-vous est obligatoire",401);
  ///verification du date si elle est valide
  let dtRdv=new Date(newReservation.daterdv);
  if(isNaN(dtRdv.getTime())) throw new CustomError("La date de rendez-vous n'est pas valide",401);
  newReservation.daterdv=dtRdv
  selectedservices= await serviceService.findCoreServiceById(newReservation.service_id);
  console.log(selectedservices);
  newReservation.client=req.user
  newReservation.client_id=req.user._id;
  newReservation.service=selectedservices;
  newReservation.prix=selectedservices.prix;
  newReservation.status=0;
  //suppression des informations inutile dans la base de données

  await reservationsRepository.insert([newReservation]);
  res.json({message: "nouveau reservation inséré avec succès"});
});

//insertion reservations
//@desc create reservation
//@route Post /api/reservations/assigner/:id
//@access private
const assignereservations = asyncHandler(async (req, res) =>{
  console.log(req.params)
  const reservation = await reservationsService.findCoreReservationById(req.params.id);
  const newReservation = assign(Reservations, req.body,'assignerRdvShemaDto');
  //test du valeur de données
  if(!newReservation.employee_id) throw new CustomError("vous devez assigner ceci à un employée",401);
  if(!newReservation.comission) throw new CustomError("la  comission est obligatoire",401);
  if(newReservation.comission<0) throw new CustomError("la valeur de la commission n'est pas correcte",401);
  
  selected_emp= await userRepository.findById(newReservation.employee_id);
  newReservation.client=req.user
  newReservation.employee=selected_emp;
  newReservation.status=2;
  newReservation._id=req.params.id;
  //suppression des informations inutile dans la base de données

  await reservationsRepository.update(newReservation);
  res.json({message: "reservation assigné à un employé avec succès"});
});

//insertion reservations
//@desc create reservation
//@route Post /api/reservations/mes-reservations
//@access private

const liste_mes_reservations = asyncHandler(async (req, res) =>{ 
  const connected_user=req.user;
  const filter = [{
    column: 'client_id',
    type: 'string',
    value:connected_user._id,
    comparator: '='
}];
 result= await reservationsService.findCoreReservationbyfilter(filter);
  res.json(result);
});

//insertion reservations
//@desc create reservation
//@route Post /api/reservations/mes-clients
//@access private

const liste_mes_clients = asyncHandler(async (req, res) =>{ 
  const connected_user=req.user;
  console.log("test client connected");
  console.log(req.user);
  console.log("test client connected");
  const filter = [{
    column: 'employee_id',
    type: 'string',
    value:connected_user._id,
    comparator: '='
}];
 result= await reservationsService.findCoreReservationbyfilter(filter);
  res.json(result);
});



//@desc  update reservations
//@route PUT /api/reservations/:id
//@access private
const updatereservations = asyncHandler(async (req, res) =>{
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`Aucun id en vue : ${req.params.id}`);
    }

    const reservation = {
      idRdv: req.body.idRdv,
      idService: req.body.idService,
      idEmploye: req.body.idEmploye,
      dateHeure: req.body.dateHeure,
      commission: req.body.commission,
      status: req.body.status
    };

    const doc = await Reservations.findByIdAndUpdate(req.params.id, { $set: reservation }, { new: true });
    res.send(doc);
  } catch (err) {
    console.error("Erreur dans l'update de la reservation :", err);
    res.status(500).send("Une erreur dans l'update de la reservation");
  }
});


//@desc  delete employee
//@route Delete /api/reservations/:id
//@access public
const deletereservations =  asyncHandler(async (req, res) =>{
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`Aucun id en vue : ${req.params.id}`);
    }

    const doc = await Reservations.findByIdAndRemove(req.params.id);
    res.send(doc);
  } catch (err) {
    console.error('Erreur dans la suppression :', err);
    res.status(500).send('Erreur dans la suppression');
  }
});


module.exports={liste_mes_clients,liste_mes_reservations,assignereservations,generatereservations,getreservations,getreservationsByID,createreservations,updatereservations,deletereservations}