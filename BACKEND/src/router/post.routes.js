const express = require("express");
const router = express.Router();

const postController = require("../controller/post.controller");
const authMiddleware = require("../middlewares/auth.Middlewares");
const upload = require("../middlewares/upload.middlewares");
const userContoller = require("../controller/user.controller");




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
)
router.put(
    "/like/:id",
    authMiddleware,
    postController.likePost
)
router.post(
    "/comment/:id",
    authMiddleware,
    postController.addComment
)
router.delete(
    "/delete/:id",
    authMiddleware,
    postController.deletPost
)
router.put(
    "/update/:id",
    authMiddleware,
    upload.single("media"),
    postController.updatePost
)

router.get("/:postId",
     postController
     .getSinglePost)

     router.get(
    "/search/:keyword",
    userContoller.searchUser
);




module.exports = router;