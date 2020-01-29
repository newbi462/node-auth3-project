const express = require('express');
const bcryptjs = require('bcryptjs'); // dependancy for hash of pass best bpractice
const jwt = require('jsonwebtoken');// DEPENDANCY FOR TOKENS

const myMidWare = require('./../midware/mymid.js');

const UserModel = require('./userModel.js');


const router = express.Router();

router.post("/register", (request, responce) => {
  let userObj = request.body;
  const hash = bcryptjs.hashSync(request.body.password, 8);// 2^8 hash
  userObj.password = hash;// based on what I called this in my table object

  UserModel.addUser(userObj)
    .then(saved => {
      responce.status(201).json(saved);
    })
    .catch(error => {
      responce.status(500).json(error);
    });
});

router.post("/login", (request, responce) => {
  let { username, password } = request.body;

  UserModel.findByProp({ username }).first()//first() assumes user is the first find
    .then(userObj => {
      if (userObj && bcryptjs.compareSync(password, userObj.password)) {
        const token = signToken(userObj); // <<<<<<<<<<<
        //responce.status(200).json({ token }); // <<<<<<<<<<
        responce.status(200).json(
          {
            message: `Welcome ${userObj.username}!, you are Logged In`,
            tokenMeg: token
          }
        );
      } else {
        responce.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      responce.status(500).json(error);
    });
});


function signToken(user) {
  const payload = {
    userid: user.id
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, myMidWare.jwtSecret, options);
}

module.exports = router;
