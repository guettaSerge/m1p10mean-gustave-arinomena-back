const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Offres } = require('../models/offres');
router.use(cookieParser());

// lien a utiliser pour le test sur postman: localhost:3000/offre/

//Select offres
router.get('/', async(req, res) => {
    try {
        const docs = await Offres.find();
        res.send(docs);
      } catch (err) {
        console.log("Une erreur dans la récupération des données des offres :" + JSON.stringify(err, undefined, 2));
      }
    });


//Select offre par id
    router.get('/:id', async (req, res) => {
        try {
          if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`Aucun enregistrement avec l'identifiant donné : ${req.params.id}`);
          }
      
          const offres = await Offres.findById(req.params.id);
      
          if (!offres) {
            return res.status(404).send(`Aucun offres trouvé avec l'identifiant : ${req.params.id}`);
          }
      
          res.send(offres);
        } catch (err) {
          console.error("Erreur lors de la récupération de l' offre :", err);
          res.status(500).send('Erreur interne du serveur');
        }
      });
      
//insertion offres
router.post('/', async (req, res) => {
    try {
      const offres = new Offres({
        idService: req.body.idService,
        dateDebut: req.body.dateDebut,
        dateFin: req.body.dateFin,
        pourcentageDeReduction: req.body.pourcentageDeReduction
      });
      await offres.save();
      res.send(offres);
    } catch (err) {
      console.error('Error in offres Save:', err);
      res.status(500).send("Erreur lors de l'insertion de l' offre" +  + JSON.stringify(err, undefined, 2));
    }
  });

//update offres
  router.put('/:id', async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`Aucun id en vue : ${req.params.id}`);
      }
  
      const offres = {
        idService: req.body.idService,
        dateDebut: req.body.dateDebut,
        dateFin: req.body.dateFin,
        pourcentageDeReduction: req.body.pourcentageDeReduction
      };
  
      const doc = await Offres.findByIdAndUpdate(req.params.id, { $set: offres }, { new: true });
      res.send(doc);
    } catch (err) {
      console.error("Erreur dans l'update de l' offre :", err);
      res.status(500).send("Une erreur dans l'update de l' offre");
    }
  });
  
//delete offres
  router.delete('/:id', async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`Aucun id en vue : ${req.params.id}`);
      }
  
      const doc = await Offres.findByIdAndRemove(req.params.id);
      res.send(doc);
    } catch (err) {
      console.error('Erreur dans la suppression :', err);
      res.status(500).send('Erreur dans la suppression');
    }
  });


module.exports = router;