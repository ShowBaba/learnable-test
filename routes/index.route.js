var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Mama Sauce's Mama Put" });
});

module.exports = router;
