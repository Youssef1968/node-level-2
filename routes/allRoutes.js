//Lolo
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");

var { requireAuth } = require("../middleware/middleware");
//level2
const { checkIfUser } = require("../middleware/middleware");
const authController = require("../controllers/authController");

router.get("*", checkIfUser);
router.post("*", checkIfUser);

const multer = require("multer");
// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage: multer.diskStorage({}) });


// Level 3
router.post(
  "/update-profile",
  upload.single("avatar"),

  authController.post_profileImage
);

// Level 2
router.get("/signout", authController.get_signout);

router.get("/login", authController.get_login);

router.get("/signup", authController.get_signup);

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  authController.post_signup
);

router.post("/login", authController.post_login);

router.get("/", authController.get_welcome);
//level1
//get request
router.get("/home", requireAuth, userController.user_index_get);

router.get("/edit/:id", requireAuth, userController.user_edit_get);

router.get("/view/:id", requireAuth, userController.user_view_get);

//post request

router.post("/search", userController.user_search_post);

// delete request mira_231108_121854_743
router.delete("/edit/:id", userController.user_delete);

//put request
//mira_231109_122114_346
router.put("/edit/:id", userController.user_put);

module.exports = router;
