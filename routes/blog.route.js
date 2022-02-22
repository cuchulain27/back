/* 
ruta: api/blog
*/

'use strict'
const express = require('express');
const BlogController = require('../controllers/blog.controller');

const api = express.Router();

api.post('/new_entry', BlogController.new_blog_entry);
api.get('/resumed', BlogController.get_resumed_blogs);
api.get('/:blogId', BlogController.get_blog_page);
api.get('/find/content', BlogController.find_page);
api.get('/categories/list', BlogController.getCategories);
api.get('/categories/find', BlogController.change_category);

module.exports = api;