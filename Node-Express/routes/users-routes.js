const express = require("express");
const { check } = require("express-validator");


const usersConstroller = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersConstroller.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersConstroller.signUp
);

router.post("/login", usersConstroller.logIn);

module.exports = router;
