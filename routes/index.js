const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController.js");

router.get("/", controller.index_get);
router.post("/messages/:id", controller.message_delete);

module.exports = router;
