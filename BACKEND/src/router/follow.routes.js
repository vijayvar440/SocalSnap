const express = require("express");
const followController = require("../controller/follow.controller");
const authMiddleware = require("../middlewares/auth.Middlewares");

const router = express.Router();

router.put(
    "/:userId",
    authMiddleware,
    followController.followUser
);

router.get(
    "/followers/:userId",
    followController.getFollowers
);

router.get(
    "/following/:userId",
    followController.getFollowing
);

module.exports = router;