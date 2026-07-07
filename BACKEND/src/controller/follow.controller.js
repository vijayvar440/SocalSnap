const userModel = require("../model/user.model");

async function followUser(req, res) {
    try {
        // Logged in user ki ID
        const loggedUserId = req.user.id;

        // Jise follow karna hai uski ID
        const targetUserId = req.params.userId;

        console.log("Logged User ID:", loggedUserId);
        console.log("Target User ID:", targetUserId);
        console.log("Params:", req.params);

        // Khud ko follow nahi kar sakta
        if (loggedUserId === targetUserId) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        // Login user nikalo
        const loggedUser = await userModel.findById(loggedUserId);

        if (!loggedUser) {
            return res.status(404).json({
                message: "Logged in user not found"
            });
        }

        // Target user nikalo
        const targetUser = await userModel.findById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({
                message: "Target user not found"
            });
        }

        // Already follow kar raha hai?
        if (loggedUser.following.includes(targetUserId)) {
            return res.status(400).json({
                message: "Already following this user"
            });
        }

        // Follow
        loggedUser.following.push(targetUserId);
        targetUser.followers.push(loggedUserId);

        await loggedUser.save();
        await targetUser.save();

        return res.status(200).json({
            message: "User followed successfully"
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    followUser
};