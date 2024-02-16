const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Employees } = require('../models/employees');
router.use(cookieParser());

// lien a utiliser pour le test sur postman: localhost:3000/employee/

//Select Employees
router.get('/', async(req, res) => {
    try {
        const docs = await Employees.find();
        res.send(docs);
      } catch (err) {
        console.log("Une erreur dans la récupération des données de l'employee :" + JSON.stringify(err, undefined, 2));
      }
    });


//Select employee par id
    router.get('/:id', async (req, res) => {
        try {
          if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`Aucun enregistrement avec l'identifiant donné : ${req.params.id}`);
          }
      
          const emp = await Employees.findById(req.params.id);
      
          if (!emp) {
            return res.status(404).send(`Aucun employee trouvé avec l'identifiant : ${req.params.id}`);
          }
      
          res.send(emp);
        } catch (err) {
          console.error("Erreur lors de la récupération de l'utilisateur :", err);
          res.status(500).send('Erreur interne du serveur');
        }
      });
      
//insertion employee
router.post('/', async (req, res) => {
    try {
      const emp = new Employees({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        mdp: req.body.mdp
      });
      await emp.save();
      res.send(emp);
    } catch (err) {
      console.error('Error in Employee Save:', err);
      res.status(500).send("Erreur lors de l'insertion de l'utilisateur" +  + JSON.stringify(err, undefined, 2));
    }
  });

//update employee
  router.put('/:id', async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`Aucun id en vue : ${req.params.id}`);
      }
  
      const emp = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        mdp: req.body.mdp
      };
  
      const doc = await Employees.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true });
      res.send(doc);
    } catch (err) {
      console.error("Erreur dans l'update de l'utilisateur :", err);
      res.status(500).send("Une erreur dans l'update de l'utilisateur");
    }
  });
  
//delete employee
  router.delete('/:id', async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`Aucun id en vue : ${req.params.id}`);
      }
  
      const doc = await Employees.findByIdAndRemove(req.params.id);
      res.send(doc);
    } catch (err) {
      console.error('Erreur dans la suppression :', err);
      res.status(500).send('Erreur dans la suppression');
    }
  });

//login employee
router.post('/login', async (req, res) => {
  const { mail, mdp } = req.body;
  const Employees = await Employees.findOne({ mail });
  if (!Employees) {
    return res.status(404).send('Utilisateur introuvable');
  }

  const isMatch = await bcrypt.compare(mdp, Employees.mdp);

  if (!isMatch) {
    return res.status(401).send('Mot de passe incorrect');
  }
  const token = jwt.sign({ id: Employees._id }, 'secret', { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true });

  res.send('Connexion réussie');
});

//logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');

  res.send('Déconnexion réussie');
});

module.exports = router;