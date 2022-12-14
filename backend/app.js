// It is server for backend!

const path = require("path");
const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require("mongoose");

const postsRoutes= require("./routes/posts");
const userRoutes= require("./routes/user");



//express server creation video 3.4
const app = express();

mongoose.connect("mongodb+srv://root:" +process.env.MONGO_ATLAS_PW+ "@cluster0.avfdqfj.mongodb.net/meansteak")
//mongoose.connect("mongodb+srv://root:root@cluster0.avfdqfj.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connected to D-Base!");
})
.catch(()=>{
  console.log("DBase connection Failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, OPTIONS, DELETE"
  );
  next();
})

app.use("/api/posts",  postsRoutes);
app.use("/api/user",  userRoutes);


module.exports= app;
//express server creation video 3.4
