const express = require("express");
const router = express.Router();

const postController = require("../controller/post.controller");
const authMiddleware = require("../middlewares/auth.Middlewares");
const upload = require("../middlewares/upload.middlewares");
const userContoller = require("../controller/user.controller");

// ================= POST =================

router.post(
    "/createPost",
    authMiddleware,
    upload.single("media"),
    postController.creatPost
);

router.get(
    "/my-posts",
    authMiddleware,
    postController.getPost
);

router.get(
    "/all-posts",
    authMiddleware,
    postController.getAllPost
);

router.put(
    "/update/:id",
    authMiddleware,
    upload.single("media"),
    postController.updatePost
);

router.delete(
    "/delete/:id",
    authMiddleware,
    postController.deletPost
);

// ================= PROFILE =================

router.get(
    "/profile",
    authMiddleware,
    userContoller.getProfile
);

router.put(
    "/update-profile",
    authMiddleware,
    upload.single("profileImage"),
    userContoller.updateProfile
);

router.get(
    "/user/:id",
    userContoller.getUserProfile
);

// ================= SEARCH =================

router.get(
    "/search/:keyword",
    userContoller.searchUser
);

// ================= FOLLOW =================

router.put(
    "/follow/:userId",
    authMiddleware,
    userContoller.followUser
);

router.get(
    "/followers/:userId",
    userContoller.getFollowers
);

router.get(
    "/following/:userId",
    userContoller.getFollowing
);

// ================= LIKE & COMMENT =================

router.put(
    "/like/:id",
    authMiddleware,
    postController.likePost
);

router.post(
    "/comment/:id",
    authMiddleware,
    postController.addComment
);

// ================= SINGLE POST (Hamesha Last Dynamic Route) =================

router.get(
    "/:postId",
    postController.getSinglePost
);

module.exports = router;