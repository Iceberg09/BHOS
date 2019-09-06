const router = require('express').Router();

//router connecting the registration logic with the backend.js
const register = require('./register')
router.use(register);

//router connecting the login logic with the backend.js
const login = require('./login')
router.use(login);

//etc.
const recover = require('./recover')
router.use(recover);

//etc.
const catcher = require('./catcher')
router.use(catcher);

module.exports = router;