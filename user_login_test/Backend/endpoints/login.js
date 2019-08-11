const loginrouter = require('express').Router();

loginrouter.get('/user/:UserEmail&:UserPassword', (req, res) => {
	console.log("Fetching user with email: " + req.params.UserEmail)
    
    const pool = require('../backend');

	// connect to the project's local database (BHOS_login_data) under user "root", which has a password "password"
	const connection = pool

	// Set the id inputted in the client's request to a variable called 'userId' for cleanliness
	const myUsers = 'users'
	const userEmail = req.params.UserEmail
	const userPassword = req.params.UserPassword

	if(userEmail == '~' || userPassword == '~'){
		console.log("One or both credentials fields are empty")
		res.json(false)
	} else{

		const queryString = "SELECT * FROM ?? WHERE user_email = ? AND user_password = ?"

		connection.query(queryString, [myUsers,userEmail, userPassword], (err, rows) => {
			if (err) {
				console.log("Failed to query for users: " + err)
				res.sendStatus(500)
				throw err
			}
			console.log("I think we fetched users successfully, or at least no error was thrown by database")

			if(Object.keys(rows).length != 0){ // this is where the login logic would go

				const users = rows.map((row) => {
					return {returnedFullName: row.full_name, returnedUserEmail: row.user_email}
				})
				
				res.json(users)
				console.log("User found!");
			} else{
				res.json(false)
				console.log("No such user in database!");
			}

		})
	}
})

module.exports = loginrouter;