const promisedQuery = require("./promisedQuery")

async function getAllBookCatigories() {
    return promisedQuery.createPromisedQuery(
        "SELECT * FROM book_catigories"
    )
}

async function getBookCatigoryById(catigoryId) {
    return promisedQuery.createPromisedQuery(
        "SELECT * FROM book_catigories where id = ?", 
        [catigoryId]
    )
}


module.exports = {
    getAllBookCatigories, 
    getBookCatigoryById
}