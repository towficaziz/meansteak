const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require("mongoose");

const Post= require("./models/post");

//express server creation video 3.4
const app = express();

mongoose.connect("mongodb+srv://root:root@cluster0.avfdqfj.mongodb.net/meansteak")
//mongoose.connect("mongodb+srv://root:root@cluster0.avfdqfj.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connected to D-Base!");
})
.catch(()=>{
  console.log("DBase connection Failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, OPTIONS, DELETE"
  );
  next();
})

app.post("/api/posts",(req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: "Post added successfully"
  });
});

app.get('/api/posts',(req, res, next)=>{
  Post.find()
  .then(documents =>{
    res.status(200).json({
      message: "Posts fatched successfully",
      posts: documents
  });

  console.log(documents);
  });
});

module.exports= app;
//express server creation video 3.4
