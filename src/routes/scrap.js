const { Router } = require("express");
const router = Router();

const { scrapKeywords } = require("../controllers/scrap.controller");

router.post("/keywords", scrapKeywords);

module.exports = router;

