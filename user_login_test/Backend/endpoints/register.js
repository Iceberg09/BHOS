// THERE IS A BUG BETWEEN LINES 56 AND 85 EITHER DUE TO THE SECOND QUERY NOT WAITING FOR
// THE FIRST TO FINISH, -OR- THE LOGIC AFTER THE SECOND QUERY NOT WAITING FOR THE RESULTS

// IMPACT: ALERT AFTER A SUCCESSFUL REGISTRATION SHOWS FALSE INFO (EVERYTHING ELSE WORKS)

const registerrouter = require('express').Router();

// If the backend receives as a POST API request
registerrouter.post('/user', (req, res) => {
	console.log("Posting a new user. User's new id = ")
    
    const pool = require('../backend');

	// connect to the project's local database (BHOS_login_data) under user "root", which has a password "password"
	const connection = pool

	// Assign the details sent from the frontend to different variables to be used later
	const usersTable = 'usersNew'
	const userUsername = req.body.user_username
    const userFullname = req.body.user_fullname
    const userLicense = req.body.user_license
	const userPassword = req.body.user_password
	console.log(userUsername);

	if(userUsername == '' || userFullname == '' || userLicense == '' || userPassword == ''){
		console.log('responding with an error because the user had a blank field')
		res.json('You have missing fields!')
	}
	
	else {
		// the INSERT SQL command -- the question marks allow us to add another string/variable in their place when sending the command to the SQL database
		const insertString = "INSERT INTO ?? (user_username, user_fullname, user_license, user_password) VALUES (?,?,?,?);"

		// another query, but this time for confirming that the inserted user credentials actually got inserted into the database (by querying it)
		const queryString1 = "SELECT * FROM ?? WHERE id=LAST_INSERT_ID();"

		const queryString2 = "SELECT * FROM ?? WHERE user_username = ?;"

		connection.query(queryString2, [usersTable,userUsername], (err, rows) => {
			if (err) {
				console.log("Failed to query for users from database: " + err)
				res.sendStatus(500)
				throw err
			}

			if(Object.keys(rows).length != 0){ // this is where the login logic would go
				res.json("The Username " + userUsername + " is already taken. Try another Username!")
				const users = rows.map((row) => {
					console.log("App user tried to register with a username that's already associated with " + row.user_fullname + "'s account");
				})
			} 
			
			else{

				// run the query (insertString) on the variable 'connection', which is a mysql connection (as introduced by the mysql node plugin)
				// replace the question mark in the query with the different details sent by the frontend by placing it after it in between [] within
				//  the query function (a function introduced by the mysql node plugin) the last parameter in the 'query' function is an arrow function
				// with three parameters, errors, rows (indecies), and fields (cells) -- we're only using 'err' for now.
				connection.query(insertString, [usersTable, userUsername, userFullname, userLicense, userPassword], (err, rows, fields) => {
					// catch errors
					if (err) {
						console.log("Failed to insert the user to database: " + err)
						res.sendStatus(500)
						throw err
						// OR // return
					}
					console.log("I think we inserted the user to the database successfully")
				})
                
				connection.query(queryString1, usersTable, (err, rows) => {
					if (err) {
						console.log("Failed to query for last inserted user from database: " + err)
						res.sendStatus(500)
						throw err
						// OR // return
					}
					console.log("I think we fetched the last iserted user into the database successfully")

                    console.log(rows)
					// just changing the way the outputted JSON looks -- only outputting the id, full name, and email (and not the password).
					const users = rows.map((row) => {
                        return {userId: row.id, userFullname: row.user_fullname, userUsername: row.user_username}
                    })
                    console.log(users)

					// send the outputted JSON in the REST API response as a JSON object
					res.json(users)
				})	

				// res.end()
			}
		})
	}
})

module.exports = registerrouter;