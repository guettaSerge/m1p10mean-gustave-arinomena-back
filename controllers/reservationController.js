const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const asyncHandler=require('express-async-handler')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Reservations } = require('../models/reservation.model');
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
  try {
    let iduser=req.user._id
    const reservation = new Reservations({
      idUser:iduser,
      idService: req.body.idService,
      idEmploye: req.body.idEmploye,
      dateHeure: req.body.dateHeure,
      commission: req.body.commission,
      status: req.body.status
    });
    await reservation.save();
    res.send(reservation);
  } catch (err) {
    console.error('Error in reservation Save:', err);
    res.status(500).send("Erreur lors de l'insertion de la reservation" +  + JSON.stringify(err, undefined, 2));
  }
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


module.exports={getreservations,getreservationsByID,createreservations,updatereservations,deletereservations}