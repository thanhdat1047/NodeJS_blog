const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

//function handler
router.get('/search/:slug', siteController.search);
router.get('/', siteController.home);

module.exports = router;
