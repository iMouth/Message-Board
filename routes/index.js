const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController.js");

router.get("/", controller.index_get);

module.exports = router;
