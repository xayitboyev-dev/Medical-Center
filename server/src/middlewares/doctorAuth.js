module.exports = (req, res, next) => {
    if (req.user?.role === "doctor") next();
    else res.status(401).json({ error: true, message: "You are not a doctor!" });
};