const express = require("express");
const followController = require("../controller/follow.controller");
const authMiddleware = require("../middlewares/auth.Middlewares");

const router = express.Router();

router.post(
    "/:userId",
    authMiddleware,
    followController.followUser
);

module.exports = router;