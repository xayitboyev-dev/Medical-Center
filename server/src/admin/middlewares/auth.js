const User = require("../../models/User");

module.exports = async (req, res, next) => {
    const user = await User.findById(req.user?._id);
    if (user && user.role === "admin") next();
    else res.status(404).json({ error: true, message: "You aren't admin!" });
};