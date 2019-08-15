// load our backend server using express
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const backend = express();

// Using the express body-parser to be able to read values as sent from the frontend's fretch (POST API) function
backend.use(bodyParser.json());

backend.use(morgan('combined'));

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'BHOS_login_data'	
})

// run the server on localhost:3003 and have it start listening for REST API requests 
backend.listen(3003, () => {
	console.log("Server is up and listening on 3003!!!");
})

const routes = require('./endpoints/routes')
backend.use(routes)

module.exports = pool;