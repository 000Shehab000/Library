const connection = require("./connection")
const util = require("util")

function createPromisedQuery(query, params) {
    const conn = connection.getConnection()
    let promisedQuery =  util.promisify(conn.query).bind(conn)
    console.log("promisedQuery created successflly")
    return promisedQuery(query, params)
}

// another version of promised query using dependency injection to database connection
function createPromisedQueryWithConnection(dbConnection, query, params) {
    let promisedQuery = util.promisify(dbConnection.query).bind(dbConnection)
    console.log("promisedQueryWithConnection created successflly")
    return promisedQuery(query, params)
}

module.exports = {
    createPromisedQuery, 
    createPromisedQueryWithConnection
}