// load our backend server using express
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const backend = express();

// Using the express body-parser to be able to read values as sent from the frontend's fretch (POST API) function
backend.use(bodyParser.json());

backend.use(morgan('combined'));

// If the backend receives as a POST API request
backend.post('/user', (req, res) => {
	console.log("Posting a new user. User's new id = ")
	
	// connect to the project's local database (BHOS_login_data) under user "root", which has a password "password"
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'BHOS_login_data'
	})

	// Assign the details sent from the frontend to different variables to be used later
	const myUsers = 'users'
	const userName = req.body.full_name
	const userEmail = req.body.user_email
	const userPassword = req.body.user_password
	console.log(userName);

	// the INSERT SQL command -- the question marks allow us to add another string/variable in their place when sending the command to the SQL database
	const insertString = "INSERT INTO ?? (full_name, user_email, user_password) VALUES (?,?,?);"

	// run the query (insertString) on the variable 'connection', which is a mysql connection (as introduced by the mysql node plugin)
	// replace the question mark in the query with the different details sent by the frontend by placing it after it in between [] within
	//  the query function (a function introduced by the mysql node plugin) the last parameter in the 'query' function is an arrow function
	// with three parameters, errors, rows (indecies), and fields (cells) -- we're only using 'err' for now.
	connection.query(insertString, [myUsers, userName, userEmail, userPassword], (err, rows, fields) => {
		// catch errors
		if (err) {
			console.log("Failed to insert the user: " + err)
			res.sendStatus(500)
			throw err
			// OR // return
		}
		console.log("I think we inserted the user successfully")
	})

	// another query, but this time for confirming that the inserted user credentials actually got inserted into the database (by querying it)
	const queryString = "SELECT * FROM ?? WHERE id=LAST_INSERT_ID();"
		
	connection.query(queryString, [myUsers], (err, rows) => {
		if (err) {
			console.log("Failed to query for last inserted user: " + err)
			res.sendStatus(500)
			throw err
			// OR // return
		}
		console.log("I think we fetched the last iserted user successfully")

		// just changing the way the outputted JSON looks -- only outputting the id, full name, and email (and not the password).
		const users = rows.map((row) => {
			return {userId: row.id, fullName: row.full_name, userEmail: row.user_email}
		})

		// send the outputted JSON in the REST API response as a JSON object
		res.json(users)
	})	

	// res.end()
})

// If the backend receives as a GET API request
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
	const myUsers = 'users'
	const userId = req.params.id

	const queryString = "SELECT * FROM ?? WHERE id = ?"

	connection.query(queryString, [myUsers,userId], (err, rows) => {
		if (err) {
			console.log("Failed to query for users: " + err)
			res.sendStatus(500)
			throw err
		}
		console.log("I think we fetched users successfully")

		const users = rows.map((row) => {
			return {fullName: row.full_name, userEmail: row.user_email}
		})

		res.json(users)
	})	
})

backend.get("/users", (req, res) => {
	var user1 = {firstName: "Mazen", lastName: "Abu"}
	const user2 = {firstName: "Josef", lastName: "Mendez"}
	res.json([user1, user2])
})

// run the server on localhost:3003 and have it start listening for REST API requests 
backend.listen(3003, () => {
	console.log("Server is up and listening on 3003!!!");
})

// catching any 404s
backend.get("*", (req, res) => {
	console.log("Responding to root route")
	res.send(`Where are you going!!!???`)
})