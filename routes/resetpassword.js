const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("resetpassword");
});

router.post("/", function (req, res) {
  res.send("Email enviado");
});

module.exports = router;
