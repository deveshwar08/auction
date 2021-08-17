const express = require('express');
const searchController = require('../controllers/searchController');

const route = express.Router();

route.get('/search',searchController.search_get);
route.post('/search',searchController.search_post);

module.exports = route;
