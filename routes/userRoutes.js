const express= require('express');
const {registerUser,loginUser,currentUser}= require('../controllers/userController');
const createAuth = require('../middleware/auth');

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/current',createAuth([2]),currentUser);

module.exports=router;