const express = require('express');
const authRouter = express.Router();
const authFunctions = require('../functions/authFunctions');
const jwtFunctions = require('../functions/jwtFunctions');

authRouter.get('/me', jwtFunctions.authenticateToken, authFunctions.getMe);

authRouter.get('/', jwtFunctions.authenticateToken, authFunctions.getUsers);

authRouter.post('/', authFunctions.createUser);

authRouter.post('/login', authFunctions.logIn);

authRouter.post('/logout', authFunctions.logOut);

module.exports = authRouter;
