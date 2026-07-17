const postModel = require("../model/post.model");

async function creatPost(req, res) {
    try {

        const { title, description, mediaType } = req.body;
        const userId = req.user.id;

        console.log("===== BODY =====");
        console.log(req.body);

        console.log("===== FILE =====");
        console.log(req.file);

        let media = "";

        if (req.file) {
            media = req.file.path;
        }

        console.log("===== DATA TO SAVE =====");
        console.log({
            title,
            description,
            media,
            mediaType,
            uploadedBy: userId
        });

        const post = await postModel.create({
            title,
            description,
            media,
            mediaType,
            uploadedBy: userId
        });

        console.log("===== SAVED POST =====");
        console.log(post);

        return res.status(201).json({
            message: "Post Created Successfully",
            post
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
}

async function getPost(req, res) {
    try {
        const userId = req.user.id;

        const posts = await postModel.find({
            uploadedBy: userId
        });

        return res.status(200).json({
            message: "My Posts Fetched Successfully",
            totalPosts: posts.length,
            posts
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

async function getAllPost(req, res) {
    try {

        
        const posts = await postModel
                      .find()
                      .populate("uploadedBy", "username profileImage")
                      .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "All Posts Fetched Successfully",
            totalPosts: posts.length,
            posts
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
}



async function likePost(req, res) {

    try {

        const userId = req.user.id;
        const postId = req.params.id;

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {

            post.likes = post.likes.filter(
                (id) => id.toString() !== userId
            );

            await post.save();

            return res.status(200).json({
                message: "Post Unliked",
                likes: post.likes.length
            });

        } else {

            post.likes.push(userId);

            await post.save();

            return res.status(200).json({
                message: "Post Liked",
                likes: post.likes.length
            });

        }

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
}
async function deletPost(req, res) {
    try {

        const postId = req.params.id;
        const userId = req.user.id;

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post Not Found"
            });
        }

        if (post.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                message: "You can delete only your own post"
            });
        }

        await postModel.findByIdAndDelete(postId);

        return res.status(200).json({
            message: "Post Deleted Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
}
async function addComment(req, res) {
    try {

        const postId = req.params.id;
        const userId = req.user.id;
        const { text } = req.body;

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post Not Found"
            });
        }

        post.comments.push({
            user: userId,
            text: text
        });

        await post.save();

        return res.status(200).json({
            message: "Comment Added Successfully",
            comments: post.comments
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
}

async function updatePost(req,res) {
    try{
        const postId = req.params.id;
        const userId = req.user.id;

        const {title,description} = req.body;

        const post = await postModel.findById(postId);

        if(!post){
            return res.status(400).json({
                massage:"post not found"
            });
        }
        if(post.uploadedBy.toString() !== userId){
            return res.status(403).json({
                massage:"You can update onliy your own post"
            });
        }

        post.title = title || post.title;
        post.description = description || post.description;


        if(req.file){
            post.media = req.file.path;
        }
        await post.save();

        return res.status(200).json({
            massage:"Post updste successfulliy",
            post
        })
    }catch(err){
        console.log(err);

        return res.status(500).json({
            massage:err.massage
        });
    }
    
}
async function getSinglePost(req, res) {
    try {
        const postId = req.params.postId;

        const post = await postModel
            .findById(postId)
            .populate("uploadedBy", "username profileImage")
            .populate("comments.user", "username profileImage");

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            message: "Post fetched successfully",
            post
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    creatPost,
    getPost,
    getAllPost,
    likePost,
    deletPost,
    addComment,
    updatePost,
    getSinglePost
};