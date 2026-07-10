const express = require("express");
const router = express.Router();

const postController = require("../controller/post.controller");
const authMiddleware = require("../middlewares/auth.Middlewares");
const upload = require("../middlewares/upload.middlewares");
const userContoller = require("../controller/user.controller")


router.post(
    "/createPost",
    authMiddleware,
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "video", maxCount: 1 },
        { name: "audio", maxCount: 1 }
    ]),
    postController.creatPost
);


router.get(
    "/my-posts",
    authMiddleware,
    postController.getPost
);
router.get(
    "/all-posts",
    postController.getAllPost
);


router.get(
    "/profile",
    authMiddleware,
    userContoller.getProfile
)

router.put(
    "/update-profile",
    authMiddleware,
    upload.single("profileImage"),
    userContoller.updateProfile
);
module.exports = router;