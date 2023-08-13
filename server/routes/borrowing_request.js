const router=require("express").Router()
const authorized =require("../MiddleWare/authorize")
const { body, validationResult } = require('express-validator');
const borrowingRequest =require("../Database/queries.borrowingRequest")
const bookQueries = require("../Database/queries.books")
const userQueries =require("../Database/queries.user")

// for user
// Add borrowing request to dataBase
router.post("",authorized,
    body("user_id").isInt().withMessage("please enter a valid user id"),
    body("book_id").isInt().withMessage("please enter a valid book id"),
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
            }
            //2.1 - check if book exists in books table in data base
            const bookDataInDataBase = await bookQueries.getBookById(req.body.book_id)
            if(bookDataInDataBase.length == 0){
                res.status(400).json({
                errors:[{messsage: "book does not exists"}]  
                });       
            }
            //2.2 - check if book exists in borrowing_request table in data base
            const bookBorrowintRequest = await borrowingRequest.getBorrowingRequestsByBookId(req.body.book_id)
            if(bookBorrowintRequest.length > 0){
                res.status(400).json({
                errors:[{messsage: "borrowing request already exist"}]  
                });   

            }else{
                // 4-insert into data base
                await borrowingRequest.insertBorrowingRequest(req.body.user_id,req.body.book_id,req.body.duration_in_days)
                res.status(200).json({Message: "borrowing request added successfully!"});
            }

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
            }
    }
);

router.get("/:id",authorized,
    async(req,res)=>{
            const listOfBorrowedBooks = await borrowingRequest.getAllBooksAcceptedByAdminForUser(req.params.id)
            listOfBorrowedBooks.map((book)=>{
                book.image_url= "http://"+ req.hostname+":4000" + "/" + book.image_url
            })
            if(listOfBorrowedBooks.length==0){
                res.status(400).json({msg:"no borrowed books"})
            }else{
                res.status(200).json(listOfBorrowedBooks)
            }
            
})


module.exports=router;