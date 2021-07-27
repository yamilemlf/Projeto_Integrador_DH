const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const productsController = require("../controllers/productsController")

router.get("/", indexController.get);
router.get("/types/:id")

router.post("/", indexController.get);

module.exports = router;
