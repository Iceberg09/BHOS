const recoverrouter = require('express').Router();

recoverrouter.get('/user/:UserEmail', (req, res) => {
	console.log("Recovering user account with email: " + req.params.UserEmail)
	
	const pool = require('../backend');

	// connect to the project's local database (BHOS_login_data) under user "root", which has a password "password"
	const connection = pool

	// Set the id inputted in the client's request to a variable called 'userId' for cleanliness
	const myUsers = 'users'
	const userEmail = req.params.UserEmail

	if(userEmail == '~'){
		console.log("Please enter the email address of the account you'd like to recover!")
		res.json('~')
	} else{

		const queryString = "SELECT * FROM ?? WHERE user_email = ?"

		connection.query(queryString, [myUsers,userEmail], (err, rows) => {
			if (err) {
				console.log("Failed to query for users: " + err)
				res.sendStatus(500)
				throw err
			}
			console.log("I think we found the user successfully, or at least no error was thrown by database")

			if(Object.keys(rows).length != 0){ // this is where the login logic would go

				const users = rows.map((row) => {
					return {returnedFullName: row.full_name, returnedUserEmail: row.user_email, returnedUserPassword: row.user_password}
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

module.exports = recoverrouter;