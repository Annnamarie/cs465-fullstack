var express = require("express");
var router = express.Router();

//mod 2 -- pass the request for the site's default starting page to the new main controller
const ctrlMain = require("../controllers/main");

/* GET home page. */
router.get("/", ctrlMain.index);

module.exports = router;
