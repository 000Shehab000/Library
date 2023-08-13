const express=require('express')
const app =express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("upload"))
const cors =require("cors")
app.use(cors())

// require the routes file modules
const auth = require("./routes/Auth")
const books = require("./routes/books")
const borrowingRequest = require("./routes/borrowing_request")
const adminBorrowingRequest = require("./routes/admin_borrowing_request")
const usersAccounts = require("./routes/users_accounts")


app.listen(4000,"localhost",()=>{
    console.log("server is runing");
})

app.use("/auth",auth);
app.use("/books",books);
app.use("/borrowing_request",borrowingRequest);
app.use("/admin_borrowing_request",adminBorrowingRequest);
app.use("/users_accounts",usersAccounts);