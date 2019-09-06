const catcherrouter = require('express').Router();

catcherrouter.get("/users", (req, res) => {
	var user1 = {firstName: "Mazen", lastName: "Abu"}
	const user2 = {firstName: "Josef", lastName: "Mendez"}
	res.json([user1, user2])
})

/* catcherrouter.post("/dutystatuschange", (req, res) => {

}) */

// catching any 404s
catcherrouter.get("*", (req, res) => {
	console.log("Responding to root route")
	res.send(`Where are you going!!!???`)
})



module.exports = catcherrouter;