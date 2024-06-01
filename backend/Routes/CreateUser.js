const express=require("express");
const router=express.Router();
const User= require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret="sfjskhjrwhrjhivbpbnmnwbhqqji"
router.use(express.json());

router.post("/createuser", 
[
    body('email','Incorrect Password').isEmail(),
    body('password','Incorrect Password').isLength({min:5}),
    body('name','Enter a valid name').isLength({min:5})
],
async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10);
    const secPassword= await bcrypt.hash(req.body.password,salt);
    try {
        await User.create({
            name:req.body.name,
            location:req.body.location,
            password:secPassword,
            email:req.body.email
        })
        res.json({success:true});
        
    } catch (error) {
        console.log(error)
        res.json({success:false});
        
    }
})

router.post("/loginuser", 
[
    body('email','Incorrect Password').isEmail(),
    body('password','Incorrect Password').isLength({min:5})
],
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email=req.body.email;
    try {
       let userData= await User.findOne({email})
        if(!userData){
            return res.status(400).json({ errors:"Incorrect email or password" });
        }
        const match = await bcrypt.compare(req.body.password, userData.password);
        if (!match) {
            return res.status(400).json({ errors: "Incorrect email or password" });
        }

        const payload={
            user:{
                id:userData.id
            }
        }

        const authToken=jwt.sign(payload,jwtSecret,{ expiresIn: '1h' })
        return res.json({ success:true ,authToken:authToken});          
    } catch (error) {
        console.log(error)
        res.json({success:false});
        
    }
})

module.exports=router;