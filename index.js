//Dependancies
const express = require("express");
//SESSIONB DEPENDANCIES

// Import Data
const db = require('./data/db.js');

//START WITH EXPRESS
const server = express();

//SESSION


//CUSTOME MILLEWHARE/HANDLE FUNCTIONS OR INPORTS OF
const myMidWare = require('./midware/mymid.js');

//MIDDLE WARE
server.use(express.json());
server.use(myMidWare.logger);

//ROUTES
const userRouter = require('./routes/userRouter.js');

//ENDPOINTS
server.get('/', myMidWare.logger, (req, res) => { res.send(`<h2>GLOBAL SERVER UP ENDPOINT</h2>`); });
server.use('/api', userRouter);

//LISTEN SERVER
const port = 8000;
server.listen(port, () => console.log((`\n ** api on: ${port} ** \n`)));
