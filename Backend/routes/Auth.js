const router=require("express").Router()
const connection= require("../DataBase/connection")
const userQueries = require("../DataBase/queries.user")
const { body, validationResult } = require('express-validator');
const util=require("util")
const bcrypt= require("bcrypt");
const crypto = require("crypto");


// sign up
router.post("/signUp",
body('email').isEmail().withMessage("invalide email !"),
body('name').isString().isLength({ min: 5 ,max: 20 }).withMessage("invalide name !"),
body('password').isLength({ min: 5 , max: 10}).withMessage("invalide password !"),
body('phone').isInt().withMessage("invalide phone !"),
async (req,res)=>{
    try{
        // 1-validate using express 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // 2- check if email exist in dataBase
        const checkEmailExists = await userQueries.getUsersByEmail(req.body.email)
        if(checkEmailExists.length > 0){
            res.status(400).json({
                errors:[{msg: "email already exists",}]  
            })
        }else{
            // 3- prepare object to save in dataBase
            const userData ={
                name : req.body.name,
                email : req.body.email,
                password : await bcrypt.hash(req.body.password, 10),
                role_id : 3,
                phone : req.body.phone,
                token: crypto.randomBytes(16).toString("hex"),
            }
            // 4- insert into database
            await userQueries.insertUser(userData);
            delete userData.password;
            res.status(200).json(userData)
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:err});
    }
})
// login 
router.post("/login",
body('email').isEmail().withMessage("invalide email !"),
body('password').isLength({ min: 5 , max: 10}).withMessage("invalide password !"),
async (req,res)=>{
    try{
        // 1-validate using express validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // 2- check if email exist in dataBase
        const userDataInDataBase = await userQueries.getUsersByEmail(req.body.email)
        if(userDataInDataBase.length == 0){
            res.status(400).json({
                errors:[{msg: "The email or password you entered is invalid"}]  
            });       
        }
        // 3- COMPARE HASHED PASSWORD
        const checkPassword = await bcrypt.compare(
        req.body.password,
        userDataInDataBase[0].password
        );
        if (!checkPassword) {
            res.status(400).json({
                errors:[{msg: "The email or password you entered is invalid"}]  
            });
        }else{
            if(userDataInDataBase[0].role_id != 3){
                delete userDataInDataBase[0].password;
                res.status(200).json(userDataInDataBase[0]);
            }else{
                res.status(400).json({
                    errors:[{msg: "please contact the admin to aprove your account"}]  
                });
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:err});
    }
})



module.exports=router;