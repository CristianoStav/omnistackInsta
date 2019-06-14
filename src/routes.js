const express = require('express');
const routes = new express.Router();
const multer = require('multer');
const uploadConfig = require('./config/upload');
const LikeController = require('./controllers/LikeController');

const up = multer(uploadConfig);
const PostController = require('./controllers/PostController');

routes.post('/posts', up.single('image'), PostController.store);

routes.get('/', PostController.get);

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;