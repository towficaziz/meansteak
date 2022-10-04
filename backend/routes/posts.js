const express = require("express");
// const Post= require("../models/post");
const checkAuth = require("../middleware/check-auth");
const PostController = require("../controllers/posts")

const extractFile = require("../middleware/file");

// const multer = require("multer");

const router = express.Router();

// this code and 'multer' used for storing file/ images in server

               //  Multer related codes transfered to file.js in middleware folder

// 'multer' code till here from up

router.post(
  "",
  checkAuth,
  extractFile, PostController.createPost);

router.put(
  "/:id",
  checkAuth,
  extractFile, PostController.updatePost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost),

router.delete("/:id",checkAuth, PostController.deletePost);

module.exports = router;
