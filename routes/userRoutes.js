const express= require('express');
const {registerUser,loginUser,currentUser}= require('../controllers/userController');
const createAuth = require('../middleware/auth');
const createRouteCallback = require('../commons/functions/create-route-callback');

const router=express.Router();

router.post('/register',createRouteCallback(registerUser));
router.post('/login',createRouteCallback(loginUser));
router.get('/current',createAuth([1]),createRouteCallback(currentUser));

module.exports=router;