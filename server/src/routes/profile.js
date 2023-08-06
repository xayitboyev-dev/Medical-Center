const { Router } = require("express");
const router = new Router();
const User = require("../models/User");
const validate = require("../utils/validate");
const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");

router.get("/", async (req, res) => {
    try {
        if (["user", "admin"].includes(req.user?.role)) {
            const user = await User.findById(req.user?._id).select({ __v: 0, password: 0 });
            if (user) res.json({ error: false, result: user });
            else throw "error";
        } else if (req.user?.role === "doctor") {
            const doctor = await Doctor.findById(req.user?._id).populate("hospital").select({ __v: 0, password: 0 });
            if (doctor) res.json({ error: false, result: doctor });
            else throw "error";
        } else throw "error";
    } catch (error) {
        res.status(404).json({ error: true, message: "User is not defined!" });
    };
});

router.post("/update", async (req, res) => {
    try {
        const updates = req.body;

        if (updates["workTime.from"] || updates["workTime.to"]) {
            updates.workTime = { from: updates["workTime.from"], to: updates["workTime.to"] };
            delete updates["workTime.from"];
            delete updates["workTime.to"];
        };

        if (updates?.username) updates.username = await validate.usernameValidator(updates.username);
        if (updates?.phone) updates.phone = await validate.phoneValidator(updates.phone);
        if (req.user.role == "doctor" && updates?.workTime) updates.workTime = await validate.workTimeValidator(updates.workTime);
        if (updates?.password) updates.password = await bcrypt.hash(updates.password, 10);

        // Check if user already exists
        let existingUser
        if (updates?.username) {
            if (req.user.role === "doctor") {
                existingUser = await User.findOne({ username: updates.username });
            } else {
                existingUser = await Doctor.findOne({ username: updates.username });
                if (existingUser?._id == req.user?._id) existingUser = false;
            };

            if (existingUser) {
                throw { message: `${req.user?.role === "doctor" ? "Doctor" : "User"} with this username already exists!` };
            };
        };

        // Updating the user
        let updatedUser
        if (req.user.role === "doctor") {
            updatedUser = await Doctor.findByIdAndUpdate(req.user._id, updates, { new: true });
        } else {
            updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
        };

        if (!updatedUser) {
            return res.status(404).json({ error: true, message: `${req.user.role === "doctor" ? "Doctor" : "User"} not found` });
        };

        res.status(200).json({ error: false, message: "Your profile has successfully updated!", user: updatedUser });
    } catch (error) {
        console.log(error);
        const message = validate.getErrorMessage(error);
        res.status(404).send({ error: true, message: message ? message : error.message });
    };
});

module.exports = router;