const promisedQuery = require("./promisedQuery")



async function getAllBorrowingRequests() {
    return promisedQuery.createPromisedQuery(
        "select * from borrowing_request"
    )
}

async function getBorrowingRequestsByUserId(userId) {
    return promisedQuery.createPromisedQuery(
        "select * from borrowing_request where user_id = ?", 
        [userId]
    )
}

async function getBorrowingRequestsByBookId(bookId) {
    return promisedQuery.createPromisedQuery(
        "select * from borrowing_request where book_id = ?", 
        [bookId]
    )
}
async function getBorrowingRequestsByReqId(reqId) {
    return promisedQuery.createPromisedQuery(
        "select * from borrowing_request where id = ?", 
        [reqId]
    )
}

async function getBorrowingRequestsWithDurationLessThan(durationInDays) {
    return promisedQuery.createPromisedQuery(
        "select * from borrowing_request where duration_in_days <= ?", 
        [durationInDays]
    )
}


async function getBorrowingRequestsWithDurationGreaterThan(durationInDays) {
    return promisedQuery.createPromisedQuery(
        "select * from borrowing_request where duration_in_days >= ?", 
        [durationInDays]
    )
}

async function getBorrowingRequestsWithDurationEquals(durationInDays) {
    return promisedQuery.createPromisedQuery(
        "select * from borrowing_request where duration_in_days = ?", 
        [durationInDays]
    )
}

async function getAllAcceptedBorrowingRequests() {
    return promisedQuery.createPromisedQuery(
        "select * from borrowing_request where is_accepted = 1"
    )
}

async function getAllPendingBorrowingRequests() {
    return promisedQuery.createPromisedQuery(
        `SELECT br.id, br.book_id, br.user_id, b.name AS book_name, u.name AS user_name
        FROM borrowing_request br
        JOIN books b ON br.book_id = b.id
        JOIN users u ON br.user_id = u.id
        WHERE is_accepted != 1;`
    )
}

async function getAllBooksAcceptedByAdminForUser(userId) {
    return promisedQuery.createPromisedQuery(
        `select * from books where id in (
            SELECT book_id
            FROM borrowing_request
            JOIN users on borrowing_request.user_id = ?
            and is_accepted = 1
        )`, 
        [userId]
    )
}


async function insertBorrowingRequest(
    userId, bookId
) {
    return promisedQuery.createPromisedQuery(
        "INSERT INTO `borrowing_request`(`user_id`, `book_id`, `duration_in_days`) VALUES (?, ?, ?)", 
        [userId, bookId, 2]
    )
}

async function updateBorrowingRequest(newBorrowingRequest, oldBorrowingRequestId) {
    return promisedQuery.createPromisedQuery(
        "UPDATE `borrowing_request` SET ? where id = ?", 
        [newBorrowingRequest, oldBorrowingRequestId]
    )
}

async function acceptBorrowingRequest(borrowingRequestId) {
    return promisedQuery.createPromisedQuery(
        "UPDATE `borrowing_request` SET is_accepted = 1 where id = ?", 
        [borrowingRequestId]
    )
}

async function deleteBorrowingRequest(borrowingRequestId) {
    return promisedQuery.createPromisedQuery(
        "delete from borrowing_request where id = ?", 
        [borrowingRequestId]
    )
}

module.exports = {
    getAllBorrowingRequests, 
    getBorrowingRequestsByUserId, 
    getBorrowingRequestsByBookId, 
    getAllAcceptedBorrowingRequests, 
    getAllPendingBorrowingRequests, 
    getBorrowingRequestsWithDurationEquals, 
    getBorrowingRequestsWithDurationGreaterThan, 
    getBorrowingRequestsWithDurationLessThan,
    getAllBooksAcceptedByAdminForUser ,
    insertBorrowingRequest, 
    updateBorrowingRequest, 
    deleteBorrowingRequest, 
    acceptBorrowingRequest,
    getBorrowingRequestsByReqId
}

