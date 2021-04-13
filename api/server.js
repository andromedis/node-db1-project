// Imports
const express = require("express");
const accountsRouter = require('./accounts/accounts-router')

// Express server instance
const server = express();

// Middleware
server.use(express.json());

// Routers
server.use('/api/accounts', accountsRouter)

// Exports
module.exports = server;
