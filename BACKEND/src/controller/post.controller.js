const postModel = require("../model/post.model");

async function creatPost(req, res) {
    try {

        const { title, description } = req.body;
        const userId = req.user.id;

        const image = req.files.image
            ? req.files.image[0].path
            : "";

        const video = req.files.video
            ? req.files.video[0].path
            : "";

        const audio = req.files.audio
            ? req.files.audio[0].path
            : "";

        const post = await postModel.create({
            title,
            description,
            image,
            video,
            audio,
            uploadedBy: userId
        });

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

async function getPost(req,res) {
    try{
        const userId = req.user.id;
        const posts = await postModel.findOne({
            uploadedBy:userId
        });
        return res.status(200).json({
            massage:"My Posts Fetched Successfulliy",
            totatPosts:posts.lenght,
            posts
        });
    }catch(err){
        return res.status(500).json({
            massage:"Internal server Error",
            err:err.massage
        });
    }

}

module.exports = {
    creatPost,
    getPost
};