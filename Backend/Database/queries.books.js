const promisedQuery = require("./promisedQuery")

// BOOKS Getting
async function getAllBooks() {
    return promisedQuery.createPromisedQuery(
        "select * from books"
    )
}

async function getBookById(id) {
    return promisedQuery.createPromisedQuery(
        "select * from books where id = ?", 
        [id]
    )
}

async function getBooksByName(name) {
    return promisedQuery.createPromisedQuery(
        "select * from books where name like '%?%'", 
        [name]
    )
}

async function getBooksByAuthorName(authorName) {
    return promisedQuery.createPromisedQuery(
        "select * from books where author_name like '%?%'", 
        [authorName]
    )
}


async function getBooksByRackNumber(rackNumber) {
    return promisedQuery.createPromisedQuery(
        "select * from books where rack_number = ?", 
        [rackNumber]
    )
}

async function getAllBorrowedBooks() {
    return promisedQuery.createPromisedQuery(
        "select * from books where is_borrowed = 1"
    )
}

async function getAllAvailableBooks() {
    return promisedQuery.createPromisedQuery(
        "select * from books where is_borrowed != 1"
    )
}


// BOOKS INSERTION
async function insertBook(book) {
    return promisedQuery.createPromisedQuery(
        "INSERT INTO `books` SET ?", 
        [book]
    )
}

// BOOKS UPDATE
/**
 * updates a book with given id by newBook
 */
async function updateBook(oldBookId, newBook) {
    return promisedQuery.createPromisedQuery(

        "UPDATE books SET ? WHERE id = ?", 
        [newBook, oldBookId]
    )
}

async function updateIsBorrow(book_id) {
    return promisedQuery.createPromisedQuery(
        "UPDATE `books` SET is_borrowed= 1 where id = ?", 
        [book_id]
    )
}



// BOOKS DELETION
/**
 * deletes a book with given id
 */
async function deleteBook(bookId) {
    return promisedQuery.createPromisedQuery(
        "DELETE FROM BOOKS WHERE id = ?", 
        [bookId]
    )
}


module.exports = {
    getAllBooks, 
    getBookById, 
    getBooksByAuthorName, 
    getBooksByName, 
    getBooksByRackNumber, 
    getAllAvailableBooks,
    getAllBorrowedBooks,
    insertBook, 
    updateBook, 
    deleteBook,
    updateIsBorrow
}