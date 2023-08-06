const { Router } = require("express");
const router = new Router();
const User = require("../../models/User");
const Doctor = require("../../models/Doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const contains = require("../../utils/contains");

router.get("/", (req, res) => {
    res.json({ error: false, message: "This is login page, please post your data to the url!" })
});

// Login post route
router.post('/', async (req, res) => {
    try {
        if (!contains(Object.keys(req.body), ["username", "password"])) {
            throw { message: "Please enter all user informations!" };
        };

        let { username, password } = req.body;
        username = username.toLowerCase();

        // Find the user
        let user;
        if (req.body?.role === "doctor") {
            user = await Doctor.findOne({ username });
        } else {
            user = await User.findOne({ username });
        };

        if (!user) {
            throw { message: `${req.body?.role === "doctor" ? "Doctor" : "User"} not found!` };
        };

        user = JSON.parse(JSON.stringify(user));

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw { message: 'Password is incorrect!' };
        };

        delete user.password;

        // Generate JWT token
        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '4h' });

        res.json({ error: false, message: "You have successfully logged in to your account!", token });
    } catch (error) {
        res.status(400).json({ error: true, message: error?.message });
    };
});

module.exports = router;