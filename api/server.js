const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require("express-session");
const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionConfig = {
    name: 'session',
    secret: process.env.SESSION_SECRET || 'this is a secret',
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
      maxAge: 1000 * 30,
      secure: process.env.USE_SECURE_COOKIES || false,
      httpOnly: true,
    },
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get("/", (req,res) => {
    res.json({api: "up"});
})

module.exports = server;
