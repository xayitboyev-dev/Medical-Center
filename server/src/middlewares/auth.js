const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: true, message: 'Authorization token required!', time: require("../utils/getTime")().toLocaleString() });
    };

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: true, message: 'Invalid Authorization token!' });
        };

        req.user = user?.user;
        next();
    });
};