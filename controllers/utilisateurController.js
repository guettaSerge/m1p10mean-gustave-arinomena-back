const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Utilisateurs } = require('../models/utilisateurs');
router.use(cookieParser());

// lien a utiliser pour le test sur postman: localhost:3000/utilisateur/

//Select utilisateur
router.get('/', async(req, res) => {
    try {
        const docs = await Utilisateurs.find();
        res.send(docs);
      } catch (err) {
        console.log("Une erreur dans la récupération des données de l'utilisateur :" + JSON.stringify(err, undefined, 2));
      }
    });


//Select utilisateur par id
    router.get('/:id', async (req, res) => {
        try {
          if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`Aucun enregistrement avec l'identifiant donné : ${req.params.id}`);
          }
      
          const utilisateur = await Utilisateurs.findById(req.params.id);
      
          if (!utilisateur) {
            return res.status(404).send(`Aucun utilisateur trouvé avec l'identifiant : ${req.params.id}`);
          }
      
          res.send(utilisateur);
        } catch (err) {
          console.error("Erreur lors de la récupération de l'utilisateur :", err);
          res.status(500).send('Erreur interne du serveur');
        }
      });
      
//insertion utilisateur
router.post('/', async (req, res) => {
    try {
      const user = new Utilisateurs({
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        mdp: req.body.mdp,
        dateDeNaissance: req.body.dateDeNaissance,
      });
      await user.save();
      res.send(user);
    } catch (err) {
      console.error('Error in Utilisateurs Save:', err);
      res.status(500).send("Erreur lors de l'insertion de l'utilisateur" +  + JSON.stringify(err, undefined, 2));
    }
  });

//update utilisateur
  router.put('/:id', async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`Aucun id en vue : ${req.params.id}`);
      }
  
      const user = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        mdp: req.body.mdp,
        dateDeNaissance: req.body.dateDeNaissance,
      };
  
      const doc = await Utilisateurs.findByIdAndUpdate(req.params.id, { $set: user }, { new: true });
      res.send(doc);
    } catch (err) {
      console.error("Erreur dans l'update de l'utilisateur :", err);
      res.status(500).send("Une erreur dans l'update de l'utilisateur");
    }
  });
  
//delete utilisateur
  router.delete('/:id', async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`Aucun id en vue : ${req.params.id}`);
      }
  
      const doc = await Utilisateurs.findByIdAndRemove(req.params.id);
      res.send(doc);
    } catch (err) {
      console.error('Erreur dans la suppression :', err);
      res.status(500).send('Erreur dans la suppression');
    }
  });

//login utilisateur
router.post('/login', async (req, res) => {
  const { mail, mdp } = req.body;
  const Utilisateurs = await Utilisateurs.findOne({ mail });
  if (!Utilisateurs) {
    return res.status(404).send('Utilisateur introuvable');
  }

  const isMatch = await bcrypt.compare(mdp, Utilisateurs.mdp);

  if (!isMatch) {
    return res.status(401).send('Mot de passe incorrect');
  }
  const token = jwt.sign({ id: Utilisateurs._id }, 'secret', { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true });

  res.send('Connexion réussie');
});

//logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');

  res.send('Déconnexion réussie');
});

module.exports = router;