//Lolo
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AuthUser = require("../models/authUser");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var { requireAuth } = require("../middleware/middleware");
//level2
const { checkIfUser } = require("../middleware/middleware");

router.get("*", checkIfUser);

router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/signout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("auth/login.ejs");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  async (req, res) => {
    try {
      //check validation (email & password)
      const objError = validationResult(req);

      if (objError.errors.length > 0) {
        return res.json({
          arrValidationError: objError.errors,
        });
      }

      //check if the email already exist
      const isCurrentEmail = await AuthUser.findOne({ email: req.body.email });
      if (isCurrentEmail) {
        return res.json({ existEmail: "Email already exist" });
      }

      //create new user and login
      const newUser = await AuthUser.create(req.body);
      var token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.json({ id: newUser._id });
    } catch (error) {
      console.log("####console.log(error);####");
      console.log(error);
    }
  }
);

router.post("/login", async (req, res) => {
  const loginUser = await AuthUser.findOne({ email: req.body.email });
  try {
    if (loginUser === null) {
      res.json({ notFoundEmail: "Email not found, try to sign up" });
    } else {
      // console.log("check password")
      const match = await bcrypt.compare(req.body.password, loginUser.password);

      if (match) {
        var token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET_KEY);

        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        res.json({ id: loginUser._id });
      } else {
        res.json({ passwordError: "incorrect password for " + req.body.email });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

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
