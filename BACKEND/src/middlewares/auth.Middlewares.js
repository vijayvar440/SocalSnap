const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    try {
        // Try to get token from cookie first, then Authorization header
        const tokenFromCookie = req.cookies && req.cookies.token;
        let token = tokenFromCookie;

        if (!token) {
            const authHeader = req.headers && req.headers.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;