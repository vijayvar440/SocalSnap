const userModel = require("../model/user.model");

async function followUser(req, res) {
    try {

        const loggedUserId = req.user.id;
        const targetUserId = req.params.userId;

        if (loggedUserId === targetUserId) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        const loggedUser = await userModel.findById(loggedUserId);
        const targetUser = await userModel.findById(targetUserId);

        if (!loggedUser || !targetUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if already following
        const alreadyFollowing = loggedUser.following.some(
            id => id.toString() === targetUserId
        );

        if (alreadyFollowing) {

            // Unfollow
            loggedUser.following = loggedUser.following.filter(
                id => id.toString() !== targetUserId
            );

            targetUser.followers = targetUser.followers.filter(
                id => id.toString() !== loggedUserId
            );

            await loggedUser.save();
            await targetUser.save();

            return res.status(200).json({
                message: "User Unfollowed Successfully"
            });

        } else {

            // Follow
            loggedUser.following.push(targetUserId);
            targetUser.followers.push(loggedUserId);

            await loggedUser.save();
            await targetUser.save();

            return res.status(200).json({
                message: "User Followed Successfully"
            });
        }

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
}
async function getFollowers(req, res) {
    try {

        const user = await userModel.findById(req.params.userId)
            .populate("followers", "username profileImage");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            followers: user.followers
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
}

async function getFollowing(req, res) {
    try {

        const user = await userModel.findById(req.params.userId)
            .populate("following", "username profileImage");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            following: user.following
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    followUser,
    getFollowers,
    getFollowing
};