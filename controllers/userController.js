const asyncHandler=require('express-async-handler')
const User= require('../models/user.model');
const UserService= require('../service/user.service');
const StatsService=require('../service/stats.service');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/custom-error');
const UserClass=require('../models/user.class.model');
const { assign } = require('../commons/database/methods/gen-reflect');
const GenRepository = require('../commons/database/class/gen-repository');
const md5 = require('md5');
const userRepository = new GenRepository(UserClass);
//@desc register user
//@route Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) =>{
        const newUser= assign(UserClass, req.body,"createSchemaDto");
        if(req.body.confirmPassword !== newUser.password)
        throw new CustomError('Les 2 mots de passes sont differentes')
        newUser.password=md5(newUser.password)
        email = newUser.email
        const user=await UserService.findByGmail(email);
        if(user.length > 0) {
           throw new CustomError("User already exists");
        }
        newUser.roleId = 1;
        await userRepository.insert([newUser]);

        
        if(newUser){
            res.status(201).json({"message":"utilisateur ajouté avec succès"});
        }
        else{
            throw new CustomError("user not created",401);
        }
   
});

//@desc login user
//@route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) =>{
    const user = await UserService.findUserByEmailAndPassword(req.body);
    if(!user) throw new CustomError('Email ou mot de passe invalide')
    //compare password a,d hashpassword 
        const accessToken= jwt.sign({
            user
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOOKEN_DURATION}
        );
        res.status(200).json({accessToken});
  
});

//@desc current user
//@route get /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) =>{
    result= await StatsService.findCaExpensesStats(new Date(2024, 2, 28),"year")
    res.json(result);
});

//@desc current user
//@route get /api/users/mes-clients
//@access private
const liste_mes_clients = asyncHandler(async (req, res)=>{
    const role=parseInt(req.params.role);
    const filter = [{
        column: 'roleId',
        type: 'Number',
        value:role,
        comparator: '='
    }];
    result = await UserService.findByfilter(filter);
    
    return res.json(result);
});

//@desc ajout nouvel employee
//@route get /api/users/mes-clients
//@access private
const new_employee = asyncHandler(async (req, res)=>{ 
    newUser = await UserService.findById(req.params.id);
    newUser.roleId=2;
    userRepository.update(newUser);
    res.json({message: "nouvel employée inséré avec succès"});
});


module.exports = {new_employee,liste_mes_clients,registerUser,loginUser,currentUser};