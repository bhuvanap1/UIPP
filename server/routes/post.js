// 1. import any needed libraries
const express = require("express");
const Post = require('../models/post'); //accesses functions in user model file
const router = express.Router();

// 2. create all routes to access database
router
  .post('/view', async (req, res) => {
    try {
      const post = await Post.view(req.body.id);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/create', async (req, res) => {
    try {
      const post = await Post.create(req.body.userid,req.body.post,req.body.content);
      res.send({message: 'Posted new post'});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .post('/getposts', async (req, res) => {
    try {
      const posts = await Post.getPosts(req.body.userid);
      res.send(posts);
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .put('/update', async (req, res) => {
    try {
      const post = await Post.updatePost(req.body.id,req.body.userpost,req.body.Content,req.body.likes);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await Post.deletePost(req.body.id);
      res.send({ success: "Post deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;