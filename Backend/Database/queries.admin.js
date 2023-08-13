const promisedQuery = require("./promisedQuery")


async function acceptUserAccount(userId) {
    return promisedQuery.createPromisedQuery(
        "update users set role_id = 2 where id = ?", 
        [userId]
    )
}

async function rejectUserAccount(userId) {
    return promisedQuery.createPromisedQuery(
        "delete from users where id = ?", 
        [userId]
    )
}

module.exports = {
    acceptUserAccount, 
    rejectUserAccount
}


