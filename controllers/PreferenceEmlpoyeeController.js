const express = require('express');
const {assign} = require('../commons/database/methods/gen-reflect');
const cookieParser = require('cookie-parser');
const asyncHandler=require('express-async-handler')
var router = express.Router();
const { ObjectId } = require("bson");
const PreferenceEmloyee=require('../models/PreferenceEmloyee.class.model');
const user = require("../models/user.class.model");
const GenRepository = require('../commons/database/class/gen-repository');
const utilisateurService = require('../service/user.service')
const preferenceEmployeeService=require('../service/PreferenceEmployee.services');
const CustomError = require('../errors/custom-error');
const preferenceEmployeeRepository = new GenRepository(PreferenceEmloyee);
const userRepository = new GenRepository(user) 
router.use(cookieParser());


// lien a utiliser pour le test sur postman: localhost:3000/service/

//@desc register user
//@route get /api/reservations/
//@access public
const getpreferenceEmployee = asyncHandler(async (req, res) =>{
  const data=await preferenceEmployeeService.findCoreReservationbyfilter();
  return  res.json(data);
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
    
//insertion preference
//@desc create reservation
//@route Post /api/reservations
//@access private
const createPreferenceEmployee = asyncHandler(async (req, res) =>{
  const preferenceEmployee = assign(PreferenceEmloyee, req.body,'demandepreferenceEmployeeShemaDto');
  //verification que les valeurs existent
  if(!preferenceEmployee.employee_id) throw new CustomError("l'employee est obligatoire",401);
  if(!preferenceEmployee.note) throw new CustomError("la note est obligatoire",401);
  //verification du valeur de la note 
  if(preferenceEmployee.note<0||preferenceEmployee.note>5) throw new CustomError("la note doit etre entre 0 et 5",401);
  selectedEmployee=await utilisateurService.findById(preferenceEmployee.employee_id);
  preferenceEmployee.datepref=Date.now()
  preferenceEmployee.employee=selectedEmployee
  preferenceEmployee.client=req.user;
  preferenceEmployee.client_id=req.user._id;
  await preferenceEmployeeRepository.insert([preferenceEmployee]);
  res.json({message: "nouveau reservation inséré avec succès"});
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


module.exports={createPreferenceEmployee,getpreferenceEmployee}