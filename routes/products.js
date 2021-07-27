const express = require('express');
const authMiddleware = require("../middlewares/login");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/", productsController.get);
router.get("/edit/:id", authMiddleware.auth, productsController.edit);
router.get("/types/:id", productsController.getByTypes);
router.post("/types/:id", authMiddleware.auth, productsController.post);
router.post("/", authMiddleware.auth, productsController.post);
router.put("/:id", productsController.put);
router.delete("/:id", authMiddleware.auth, productsController.delete);

module.exports = router;
