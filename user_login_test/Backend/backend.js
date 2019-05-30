// load our backend server using express
const express = require('express')
const backend = express()
const morgan = require('morgan')
const mysql = require('mysql')

backend.use(morgan('combined'))

backend.get('/user/:id', (req, res) => {
	console.log("Fetching user with id: " + req.params.id)
	
	// connect to the project's local database (BHOS_login_data) under user "root", which has a password "password"
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'BHOS_login_data'
	})

	// Set the id inputted in the client's request to a variable called 'userId' for cleanliness
	const userId = req.params.id

	// Create a sting with a question mark for the query -- the question mark allows me to add another string/variable in its place later on
	// const queryString = "SELECT * FROM !!!!!! users WHERE id = ?" // INTENTIONALLY WRONG QUERY
	const queryString = "SELECT * FROM users WHERE id = ?"

	// run the query on the variable 'connection', which is a mysql connection (as introduced by the mysql node plugin)
	// replace the question mark in queryString with userId by placing it after it in between [] within the query function (a function introduced by the mysql node plugin)
	// the last parameter in the 'query' function is an arrow function with three parameters, errors, rows (indecies), and fields (cells)
	connection.query(queryString, [userId], (err, rows, fields) => {
		// catch errors
		if (err) {
			console.log("Failed to query for users: " + err)
			res.sendStatus(500)
			throw err
			// OR // return
		}
		console.log("I think we fetched users successfully")
		// output the index(s) of the id(s) through a response as a JSON (object)

		// just changing the way the outputted JSON looks -- only outputting first names and calling them firstName (not first_name) etc.
		const users = rows.map((row) => {
			return {firstName: row.first_name, lastName: row.last_name}
		})

		res.json(users)
	})
	
	// res.end()
})

backend.get("/", (req, res) => {
	console.log("Responding to root route")
	res.send("Hello from ROOOOT!")
})

backend.get("/users", (req, res) => {
	var user1 = {firstName: "Stephen", lastName: "Curry"}
	const user2 = {firstName: "Kevin", lastName: "Durant"}
	res.json([user1, user2])
})

backend.listen()

// localhost:3003 
backend.listen(3003, () => {
	console.log("Server is up and listening on 3003!!!");
})