const { Router } = require("express");
const router = new Router();
const User = require("../../models/User");
const validate = require("../../utils/validate");
const bcrypt = require("bcrypt");
const { usernameValidator, phoneValidator } = require("../../utils/validate");

router.get("/", (req, res) => {
    res.json({ error: false, message: "This is register page, please post your data to the url!" });
});

// Register route
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        // Validate password
        if (!data.password) throw { message: "Password is required!" };
        if (data?.password?.length < 6) throw { message: "Password must be at least 6 length!" };

        // Check if user already exists
        const existingUser = await User.findOne({ username: data.username });
        if (existingUser) throw { message: 'User with this username already exists!' };

        // validate user informations
        data.username = await usernameValidator(data.username);
        data.phone = await phoneValidator(data.phone);
        data.password = await bcrypt.hash(data.password, 10);

        // Create a new user
        const newUser = new User(data);
        await newUser.save();

        res.status(201).json({ error: false, message: 'User registered successfully!', user: newUser });
    } catch (error) {
        const message = validate.getErrorMessage(error);
        res.status(404).send({ error: true, message: message ? message : error.message });
    }
});

module.exports = router;