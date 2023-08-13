const router=require("express").Router()
const conn= require("../DataBase/connection")
const bookQueries= require("../DataBase/queries.books")
const admin =require("../MiddleWare/Admin")
const authorized =require("../MiddleWare/authorize")
const { body, validationResult } = require("express-validator");
const upload = require("../MiddleWare/uploadImage");
const util = require("util"); 
const fs = require("fs"); // file module
const { log } = require("console")


// Add book to dataBase
router.post("",admin,upload.single("image_url"),
    body("name").isString().withMessage("please enter a valid book name").isLength({ min: 5 }),
    body("author_name").isString().withMessage("please enter a valid author_name ").isLength({ min: 5 }),
    body("isbn").isInt().withMessage("please enter a valid isbn"),
    body("catigory_id").isInt().withMessage("please enter a valid catigory_id"),
    body("rack_number").isInt().withMessage("please enter a valid rack_number"),
    async (req, res) => {
        try {
            // 1-validation using express 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()});
            }
            // 2-validate the image
            if (!req.file) {
                return res.status(400).json({
                errors: [{ Message: "Image is Required"},],
                });
            }else{
                // 3-prepare book object
                const bookData = {
                name: req.body.name,
                author_name: req.body.author_name,
                isbn: req.body.isbn,
                catigory_id :req.body.catigory_id,
                rack_number :req.body.rack_number,
                image_url: req.file.filename,
                };
                // 4-insert into data base
                await bookQueries.insertBook(bookData)
                res.status(200).json({Message: "book added successfully!"});
            }
        } catch (err) {
            res.status(500).json(err);
            }
    }
);

// update book in dataBase
router.put("/:id",admin,upload.single("image_url"),
    body("name").isString().withMessage("please enter a valid book name").isLength({ min: 5 }),
    body("author_name").isString().withMessage("please enter a valid author_name ").isLength({ min: 5 }),
    body("isbn").isInt().withMessage("please enter a valid isbn"),
    body("catigory_id").isInt().withMessage("please enter a valid catigory_id"),
    body("rack_number").isInt().withMessage("please enter a valid rack_number"),
    async (req, res) => {
        try {
            // 1-validation using express 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()});
            }
            //2- check if book exists or not
            const bookDataInDataBase=await bookQueries.getBookById(req.params.id)
            if(!bookDataInDataBase[0]){
                res.status(404).json({Message:"book not found!"})
            }
            // 3- prepare book object
            const bookData = {
                name: req.body.name,
                author_name: req.body.author_name,
                isbn: req.body.isbn,
                catigory_id :req.body.catigory_id,
                rack_number :req.body.rack_number,
                image_url: req.file.filename,
                };
            if(req.file){
                bookData.image_url= req.file.filename;
                // delete old image
                fs.unlinkSync("./upload/"+bookDataInDataBase[0].image_url);
            }
            // // 4- update book data in dataBase
            await bookQueries.updateBook(bookDataInDataBase[0].id,bookData)
            res.status(200).json({Message:"book updated successfully"})

        } catch (err) {
            res.status(500).json(err);
            }
    }
);

// delete book to dataBase
router.delete("/:id",admin,
    async (req, res) => {
        try {
            //1- check if book exists or not
            const bookDataInDataBase=await bookQueries.getBookById(req.params.id)
            if(!bookDataInDataBase[0]){
                res.status(404).json({Message:"book not found!"})
            }

            //2- delete the book image from the upload file
            fs.unlinkSync("./upload/"+bookDataInDataBase[0].image_url)
            
            // 3- delete book data in dataBase
            await bookQueries.deleteBook(bookDataInDataBase[0].id)
            res.status(200).json({Message:"book deleted successfully"})

        } catch (err) {
            res.status(500).json(err);
            }
    }
);

// search for a book using ID
router.get("/:id"//,authorized
    ,async(req,res)=>{
    //1- check if book exists or not
    const bookDataInDataBase=await bookQueries.getBookById(req.params.id)
    if(!bookDataInDataBase[0]){
        res.status(404).json({Message:"book not found!"})
    }
    bookDataInDataBase[0].image_url= "http://"+ req.hostname +":4000" + "/" + bookDataInDataBase[0].image_url
    res.status(200).json(bookDataInDataBase[0])
})

//list and Search for books by all the available attributes.
router.get("", async(req, res) => {
    const query = util.promisify(conn.getConnection().query).bind(conn.getConnection()); 
    let search = "";
    //query params
    if (req.query.search){
        search = `where name LIKE '%${req.query.search}%' or
        author_name LIKE '%${req.query.search}%' or
        catigory_id LIKE '%${req.query.search}%' or
        isbn LIKE '%${req.query.search}%' or
        rack_number LIKE '%${req.query.search}%'`;     
        }    
    const books = await query(`select * from books ${search}`);
    books.map(
        (book) => {
        book.image_url= "http://" + req.hostname + ":4000/" + book.image_url;
        }
    );
    res.status(200).json(books);
});

module.exports=router;