const router=require("express").Router()
const authorized =require("../MiddleWare/authorize")
const admin =require("../MiddleWare/Admin")
const { body, validationResult } = require('express-validator')
const borrowingRequest =require("../Database/queries.borrowingRequest")
const bookQueries = require("../Database/queries.books")
const userQueries =require("../Database/queries.user")


// for admin
// Show a list of borrowing requests
router.get("",admin,
    async(req,res)=>{
            const listOfBorrowingRequests = await borrowingRequest.getAllPendingBorrowingRequests()
            res.status(200).json(listOfBorrowingRequests)
            
})

// accept borrowing request
router.put("/accept",admin, 
    body("req_id").isNumeric().withMessage("please enter a valid request id"),
    body("book_id").isNumeric().withMessage("please enter a valid book id"),
    async (req, res) => {
        try {
            //1-validation using express validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //2- check if book exists or not
            const bookDataInDataBase = await bookQueries.getBookById(req.body.book_id);
            if(!bookDataInDataBase[0]){
                res.status(404).json({ Message: "book not found!" });
            }
            //3-check if request exits or not
            const reqIdDataInDataBase = await borrowingRequest.getBorrowingRequestsByReqId(req.body.req_id);
            if(!reqIdDataInDataBase[0]){
                res.status(404).json({ Message: "request not found!" });
            }else{
                await borrowingRequest.acceptBorrowingRequest(req.body.req_id);
                await bookQueries.updateIsBorrow(req.body.book_id);
                res.status(200).json({msg:"book request accepted successfully",});
            }
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }   
});

// reject borrowing request
router.delete("/reject",admin,
    body("req_id").isNumeric().withMessage("please enter a valid request id"),
    async (req, res) => {
        try {
            //1-validation request[manual,express validation]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //2-check if borrowing request exits or not
            const reqIdDataInDataBase = await borrowingRequest.getBorrowingRequestsByReqId(req.body.req_id);
            if(!reqIdDataInDataBase[0]){
                res.status(404).json({ Message: "request not found!"});
            }else{
                await borrowingRequest.deleteBorrowingRequest(req.body.req_id);
                res.status(200).json({msg:"book request deleted successfully"});
            }
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }   
});


module.exports=router;