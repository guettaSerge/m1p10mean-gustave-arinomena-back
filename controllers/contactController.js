const asyncHandler=require('express-async-handler')
const Contact = require('../models/contactModel')

//@desc Get all contact
//@route GET /api/contacts
//@access public
const getcontact = asyncHandler(async (req, res) =>{
    const contacts= await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc Get all contact
//@route GET /api/contacts
//@access public
const getOnecontact = asyncHandler(async (req, res) =>{
    const contacts= await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contacts);
});

//@desc create all contact
//@route Post /api/contacts
//@access public
const createcontact = asyncHandler(async (req, res) =>{
    console.log("The request body is :", req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are empty");
    }
    const contact = await Contact.create({name,email,phone,user_id:req.user.id});
    res.status(201).json(contact);
});

//@desc  update all contact
//@route PUT /api/contacts/:id
//@access public
const updatecontact = asyncHandler(async (req, res) =>{
    const contacts= await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updatedContact);
});

//@desc  delete contact
//@route Delete /api/contacts/:id
//@access public
const deletecontact =  asyncHandler(async (req, res) =>{
    const contacts= await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    const doc=await Contact.deleteOne()
    res.status(200).json(doc);
});
module.exports={getcontact,createcontact,updatecontact,deletecontact,getOnecontact}