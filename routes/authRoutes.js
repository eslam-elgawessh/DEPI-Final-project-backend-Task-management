const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { signup, login } = require("../controllers/authControllers");


router.post("/signup", signup);

router.post("/login", login );

module.exports = router;

