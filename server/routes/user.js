// 1. import any needed libraries
const express = require("express");
const User = require('../models/user'); //accesses functions in user model file
const router = express.Router();
const jwt = require('jsonwebtoken');

// 2. create all routes to access database
router
  .post('/login', async (req, res) => {
    try {
      const user = await User.login(req.body.username, req.body.password);
      const userid = user.userid;
      const username = user.username;
      const userData = {userid, username};
      const accessToken = jwt.sign(userData, process.env.ACCESS_SECRET,{
          expiresIn: '1h'
      });
      const refreshToken = jwt.sign(userData, process.env.REFRESH_SECRET,{
          expiresIn: '1d'
      });
      const token = await User.updateUser({username: username}, {token: refreshToken});
      res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      }).send({ accessToken});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/register', async (req, res) => {
    try {
      const user = await User.register(req.body.username, req.body.password);
      console.log("test");
      res.send({message: 'You can now log in. successfully registered'});
    } catch(error) {
      console.log("Error", error);
      res.status(401).send({ message: error.message }); 
    }
  })

  .get('/token', async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken) return res.sendStatus(401);
      const user = await User.getToken(refreshToken);
      if(!user) return res.sendStatus(403);
      jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        const userid = user.userid;
        const username = user.username;
        const userData = {userid, username};
        const accessToken = jwt.sign(userData, process.env.ACCESS_SECRET);
        res.json({ accessToken });
      });  
    } catch(error) {
      console.log('Error', error);
      res.sendStatus(403);
    }
  })

  .get('/logout', async(req, res) =>{
    try {
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken) return res.sendStatus(204);
      const user = await User.getToken(refreshToken);
      if(!user) return res.sendStatus(204);
      const token = await User.updateUser({username: user.username}, {token: null});
      res.clearCookie('refresh_token');
      console.log(token);
      return res.sendStatus(200); 

    } catch(error) {
      res.sendStatus(204);
    }

  })

  .put('/update', async (req, res) => {
    try {
      const user = await User.updatePassword(req.body.id, req.body.password);
      res.send({...user, password: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await User.deleteUser(req.body.id);
      res.send({ success: "Account deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;