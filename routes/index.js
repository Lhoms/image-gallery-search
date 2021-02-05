const express = require('express');
const { search } = require('../api/controller/searchController');

const router = express.Router();

router.get('/search/:searchTerm', search);

module.exports = router;
