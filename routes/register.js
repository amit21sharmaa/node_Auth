const express = require('express');
const user = require("../user.model")
const bycrpt = require("bcryptjs");
const { nanoid } = require('nanoid');
const router = express.Router();

/* register user. */

router.post('/', async function(req, res , next){
  try{
    //extracting data
    const {firstName, lastName, email, password} = req.body
    //checking if all data exists
    if(!(firstName && lastName && email && password)){
      res.status(400).send({message: "Please fill in all fields"});
    }
    //check if user exists
    const existUser = await user.findOne({email});
    if(existUser){
      res.status(400).send({message: "Email already exists"});
    }
    //encrypt password
    const encryptPassword = await bycrpt.hash(password, 10)
    console.log("encryptPassword", encryptPassword)
    //store user in DB
    user.create({
      firstName,
      lastName,
      email,
      password: encryptPassword,
    })
    res.status(200).send({message:"user registered"})

  }catch(error){
    console.log(error)
  }
})

module.exports = router;
