const router=require("express").Router()
const admin =require("../MiddleWare/Admin")
const { body, validationResult } = require('express-validator');
const borrowingRequest =require("../Database/queries.borrowingRequest")
const bookQueries = require("../Database/queries.books")
const userQueries =require("../Database/queries.user")


// show all new users
router.get("",admin,
    async(req,res)=>{
            const listOfNewUsers = await userQueries.getAllNewUsers()
            res.status(200).json(listOfNewUsers)
})

// aprove an account
router.post("",admin,
    body("user_id").isInt().withMessage("please enter a valid user id"),
    async (req, res) => {
        try {
            // 1-validation using express 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()});
            }
            //2 - check if user exists into data base
            const userDataInDataBase = await userQueries.getUserById(req.body.user_id)
            if(userDataInDataBase.length == 0){
                res.status(400).json({
                errors:[{messsage: "user does not exists"}]  
                });       
            }else{
                await userQueries.aproveUserById(req.body.user_id)
                res.status(200).json({messsage: "account approved sucessfully"}); 
            }
        } catch (err) {
            res.status(500).json(err);
            }
    }
);

// delete an account
router.delete("/:id",admin,
    async (req, res) => {
        try {
            //1- check if user exists or not
            const userDataInDataBase=await userQueries.getUserById(req.params.id)
            if(!userDataInDataBase[0]){
                res.status(404).json({Message:"user not found!"})
            }else{
                // 3- delete user account in dataBase
                await userQueries.deleteUser(userDataInDataBase[0].id)
                res.status(200).json({Message:"user account deleted successfully"})
            }
        } catch (err) {
            res.status(500).json(err);
            }
    }
);


module.exports=router;