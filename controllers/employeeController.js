const asyncHandler=require('express-async-handler')
const Employee= require('../models/employeeModel')

//@desc Get all employee
//@route GET /api/employee
//@access public
const getemployee = asyncHandler(async (req, res) =>{
    const employee= await Employee.find();
    res.status(200).json(employee);
});

//@desc Get all employee
//@route GET /api/employee
//@access public
const getOneemployee = asyncHandler(async (req, res) =>{
    const employee= await Employee.findById(req.params.id);
    if(!employee){
        res.status(404);
        throw new Error("employee not found");
    }
    res.status(200).json(employee);
});

//@desc create all employee
//@route Post /api/employee
//@access public
const createemployee = asyncHandler(async (req, res) =>{
    const {user_id,hierarchy} = req.body;
    if(!user_id||!hierarchy){
        res.status(400);
        throw new Error("All fields are empty");
    }
    const employee = await Employee.create({user_id,hierarchy});
    res.status(201).json(employee);
});

//@desc  update all employee
//@route PUT /api/employee/:id
//@access public
const updateemployee = asyncHandler(async (req, res) =>{
    const employee= await employee.findById(req.params.id);
    if(!employee){
        res.status(404);
        throw new Error("Employee not found");
    }
    
    res.status(200).json({"employee":'test employee'});
});

//@desc  delete employee
//@route Delete /api/employee/:id
//@access public
const deleteemployee =  asyncHandler(async (req, res) =>{
    const employee= await employee.findById(req.params.id);
    if(!employee){
        res.status(404);
        throw new Error("employee not found");
    }
    
    const doc=await Employee.deleteOne()
    res.status(200).json(doc);
});
module.exports={getemployee,createemployee,updateemployee,deleteemployee,getOneemployee}