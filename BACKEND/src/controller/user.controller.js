const userModel = require("../model/user.model");
const postModel = require("../model/post.model");

async function getProfile(req, res) {
    try {
        const userId = req.user.id;

        const user = await userModel
            .findById(userId)
            .select("-password");

        const posts = await postModel.find({
            uploadedBy: userId
        });

        return res.status(200).json({
            message: "Profile fetched successfully",
            user,
            posts
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}



async function updateProfile(req, res) {
    try {

        const { username, bio } = req.body;
        const userId = req.user.id;

        // Update object
        const updateData = {
            username,
            bio
        };

        // Agar image upload hui hai
        if (req.file) {
            updateData.profileImage = req.file.path;
        }

        // User update
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true
            }
        ).select("-password");

        return res.status(200).json({
            message: "Profile Updated Successfully",
            user: updatedUser
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    getProfile,
    updateProfile
};
