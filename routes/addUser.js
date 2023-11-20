//mira_231111_170201_440
const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment");
const userController = require("../controllers/userController");

var {requireAuth} = require("../middleware/middleware");

router.get("", requireAuth, userController.user_add_get);

router.post("",requireAuth, userController.user_post);

module.exports = router;
