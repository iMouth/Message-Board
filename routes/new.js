const express = require("express");
const router = express.Router();
const controller = require("../controllers/newController");

router.get("/new", controller.new_create_get);
router.post("/new", controller.new_create_post);

module.exports = router;
