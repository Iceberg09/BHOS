const recoverrouter = require('express').Router();

recoverrouter.get('/user/recover/:UserName&:LicenseNumber', (req, res) => {
	console.log("Recovering user account with username: " + req.params.UserName)
	
	const pool = require('../backend');

	// connect to the project's local database (BHOS_login_data) under user "root", which has a password "password"
	const connection = pool

	// Set the id inputted in the client's request to a variable called 'userId' for cleanliness
	const myUsers = 'usersNew'
	const userName = req.params.UserName
	const userLicense = req.params.LicenseNumber
	
	if(userName == '~' || userLicense == '~'){
		console.log("Please enter the username and license number of the account you'd like to recover!")
		res.json('~')
	} else{
		console.log("ADJFHADSFADSLJFJDSAKFADSKLFJ")

		const queryString = "SELECT * FROM ?? WHERE user_username = ? AND user_license = ?"

		connection.query(queryString, [myUsers,userName, userLicense], (err, rows) => {
			console.log("userLicense: " + userLicense)
			if (err) {
				console.log("Failed to query for users: " + err)
				res.sendStatus(500)
				throw err
			}
			console.log("I think we found the user successfully, or at least no error was thrown by database")

			if(Object.keys(rows).length != 0){ // this is where the login logic would go

				const users = rows.map((row) => {
					return {returnedFullName: row.full_name, returnedUserName: row.user_name, returnedUserPassword: row.user_password}
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