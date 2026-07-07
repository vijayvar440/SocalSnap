const express = require("express")
const authControlller = require("../controller/auth.controller")


const router = express.Router();

router.post("/register",authControlller.registerUser);
router.post("/loginuser",authControlller.logingUser );
router.post("/logoutUser",authControlller.logOutUser)

module.exports= router