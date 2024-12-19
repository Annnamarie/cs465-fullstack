var express = require("express");
var router = express.Router();

//mod 2 - pass the request for the site's default starting page to the new main controller
var controller = require("../controllers/travel");

/* GET travel page */
router.get("/", controller.travel);

module.exports = router;
