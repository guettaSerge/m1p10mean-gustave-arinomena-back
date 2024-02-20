const asyncHandler=require('express-async-handler')
const User= require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc register user
//@route Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) =>{
    const {name,surname,email,password}=req.body;
    if(!name||!surname||!password||!email){
        res.status(400);
        throw new Error("All fields are empty");
    }
    const userAvailable =await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }
    //hash password
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("hashed password: " + hashedPassword);
    const user=await User.create({name,surname,email,password:hashedPassword});
    if(user){
        res.status(201).json({_is:user.id,email:user.email});
    }
    else{
        res.status(400);
        throw new Error("user not created");
    }
});

//@desc login user
//@route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) =>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are empty");
    }
    const user = await User.findOne({email});
    //compare password a,d hashpassword 
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken= jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user._id,
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
});

//@desc current user
//@route get /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) =>{
    res.json(req.user);
});

module.exports = {registerUser,loginUser,currentUser};