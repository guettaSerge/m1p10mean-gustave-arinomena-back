const express= require('express');
const {new_employee,liste_mes_clients,registerUser,loginUser,currentUser}= require('../controllers/userController');
const createAuth = require('../middleware/auth');
const createRouteCallback = require('../commons/functions/create-route-callback');

const router=express.Router();

router.post('/register',createRouteCallback(registerUser));
router.post('/login',createRouteCallback(loginUser));
router.get('/current',createAuth([1,3]),createRouteCallback(currentUser));
router.get('/mes-utilisateurs/:role',createAuth([2,3]),createRouteCallback(liste_mes_clients));
router.post('/ajout-employee/:id',createAuth([3]),createRouteCallback(new_employee));

module.exports=router;