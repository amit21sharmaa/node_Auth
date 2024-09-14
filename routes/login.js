const express = require('express');
const user = require("../user.model")
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require('../bin/auth.config');
const router = express.Router();


router.post('/',async function(req, res, next) {
    try{
        //extracting login data
        const {username, password}=req.body
        console.log(req.body)
        //checking all exist
        if(!(username && password)){
            res.status(400).json({success:false, message:"Please enter both username and password"})
        }
        //validating credentials
        const validatingUser = await user.findOne({email: username});
        if(username && bycrpt.compare(password, validatingUser.password)){
            const token = jwt.sign(
                {
                    "_id": validatingUser._id
                },
                secret,
                {
                    expiresIn: 10*60
                }
            )
            validatingUser.token = token;
            validatingUser.password = undefined;
            //sending the data into cookie
            const options = {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            }
            res.status(200).cookie("token", token, options).json({
                success: true,
                message: "Login Successfull",
            })
        }else{
            res.status(401).send({"message": "invalid Credential"})
        }
    }catch(error){
        console.log(error)
    }
});

module.exports = router;