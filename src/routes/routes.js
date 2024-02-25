const express = require("express");
const router = express.Router();
const amazonSearchScrape = require('../controller/scrapeController');

router.get('/api/scrape/:keyword', amazonSearchScrape);

module.exports = router;
