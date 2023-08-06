module.exports = (req, res, next) => {
    if (["user", "admin"].includes(req.user?.role)) next();
    else res.status(401).json({ error: true, message: "You are not a user!" });
};