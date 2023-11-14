//mira_231111_170201_440
const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment");
const userController = require("../controllers/userController");

router.get("", userController.user_add_get);

router.post("", userController.user_post);

module.exports = router;
