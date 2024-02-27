const express = require("express");
const router = express.Router();
const amazonSearchScrape = require('../controller/scrapeController');

// web scraping amazon endpoint thats calling the scrape function in /src/controller
router.get('/api/scrape/:keyword', amazonSearchScrape);

module.exports = router;
