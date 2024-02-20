const asyncHandler=require('express-async-handler')
const User= require('../models/user.model');
const UserService= require('../service/user.service');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/custom-error');

//@desc register user
//@route Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) =>{
    try{
        const {name,surname,email,password,confirmPassword}=req.body;
        const user=await User.findOne({email});
        if(user){
            throw new CustomError("User already exists");
        }
        //hash password
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({name,surname,email,role:1,confirmPassword,password:hashedPassword});
        if(newUser){
            res.status(201).json({"message":"utilisateur ajouté avec succès"});
        }
        else{
            throw new CustomError("user not created",401);
        }
    }
    catch(e){
        message=e.message;
        res.status(e.statusCode?e.statusCode:500 ).json({message: message});
    }
});

//@desc login user
//@route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) =>{
    try{
        const {email,password}=req.body;
    if(!email){
        res.status(400);
        throw new Error("l'email est obligatiore");
    }
    if(!password){
        res.status(400);
        throw new Error("le mot de passe est obligatoire");
    }

    const user = await User.findOne({email});
    //compare password a,d hashpassword 
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken= jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user._id,
                role: user.role
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOOKEN_DURATION}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Invalid email or password");
    }

    }
    catch(e){
        message=e.message;
        res.status(e.statusCode?e.statusCode:500 ).json({message: message});
    }
});

//@desc current user
//@route get /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) =>{
    res.json(req.user);
});

module.exports = {registerUser,loginUser,currentUser};