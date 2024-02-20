const express = require('express');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const asyncHandler=require('express-async-handler')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Services } = require('../models/service');
router.use(cookieParser());

// lien a utiliser pour le test sur postman: localhost:3000/service/

//@desc register user
//@route Post /api/services/
//@access public
const getServices = asyncHandler(async (req, res) =>{
    try {
      const docs = await Services.find();
      res.send(docs);
    } catch (err) {
      console.log("Une erreur dans la récupération des données du service :" + JSON.stringify(err, undefined, 2));
    }
});


//@desc register user
//@route Post /api/services/:id
//@access public
const getServicesByID = asyncHandler(async (req, res) =>{
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`Aucun enregistrement avec l'identifiant donné : ${req.params.id}`);
    }

    const service = await Sercives.findById(req.params.id);

    if (!service) {
      return res.status(404).send(`Aucun service trouvé avec l'identifiant : ${req.params.id}`);
    }

    res.send(service);
  } catch (err) {
    console.error("Erreur lors de la récupération du service :", err);
    res.status(500).send('Erreur interne du serveur');
  }
});
      
//insertion Service
//@desc create service
//@route Post /api/services
//@access private
const createServices = asyncHandler(async (req, res) =>{
  try {
    const service = new Services({
      nom: req.body.nom,
      descrption: req.body.descrption,
      prix: req.body.prix,
      duree: req.body.duree
    });
    await service.save();
    res.send(service);
  } catch (err) {
    console.error('Error in Service Save:', err);
    res.status(500).send("Erreur lors de l'insertion du Service" +  + JSON.stringify(err, undefined, 2));
  }
});

//@desc  update services
//@route PUT /api/services/:id
//@access private
const updateServices = asyncHandler(async (req, res) =>{
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`Aucun id en vue : ${req.params.id}`);
    }

    const service = {
      nom: req.body.nom,
      descrption: req.body.descrption,
      prix: req.body.prix,
      duree: req.body.duree
    };

    const doc = await Services.findByIdAndUpdate(req.params.id, { $set: service }, { new: true });
    res.send(doc);
  } catch (err) {
    console.error("Erreur dans l'update du service :", err);
    res.status(500).send("Une erreur dans l'update du service");
  }
});
 
 
//@desc  delete employee
//@route Delete /api/services/:id
//@access public
const deleteServices =  asyncHandler(async (req, res) =>{
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`Aucun id en vue : ${req.params.id}`);
    }

    const doc = await Services.findByIdAndRemove(req.params.id);
    res.send(doc);
  } catch (err) {
    console.error('Erreur dans la suppression :', err);
    res.status(500).send('Erreur dans la suppression');
  }
});


  module.exports={getServices,getServicesByID,createServices,updateServices,deleteServices}