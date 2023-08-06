const { Router } = require("express");
const router = new Router();
const Doctor = require("../../models/Doctor");
const validate = require("../../utils/validate");
const bcrypt = require("bcrypt");
const { fileUpload, folder } = require("../middlewares/fileUpload");
const fs = require("fs");

router.get("/", async (req, res) => {
    let doctors = await Doctor.find().populate("service hospital");
    doctors = JSON.parse(JSON.stringify(doctors));
    doctors = doctors.filter((item) => item.service && item.hospital)
    res.json({ error: false, doctors });
});

router.get("/invalids", async (req, res) => {
    let doctors = await Doctor.find().populate("service hospital");
    doctors = JSON.parse(JSON.stringify(doctors));
    doctors = doctors.filter((item) => !item.service || !item.hospital)
    res.json({ error: false, doctors });
});

router.get("/:id", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate("service hospital");
        if (doctor) res.json({ error: false, doctor });
        else throw { message: "Doctor not found!", custom: true };
    } catch (error) {
        res.status(404).json({ error: true, message: error.custom ? error.message : "Doctor id is invalid!" });
    };
});

router.post("/add", fileUpload.single("image"), async (req, res) => {
    try {
        const data = req.body;

        // File uploading
        if (!req.file) throw { message: "Image is required!" };
        if (!["image/jpeg", "image/png", "image/jpg"].includes(req.file.mimetype)) {
            fs.unlinkSync(folder + req.file.filename);
            throw { message: "You can upload only image files!" };
        };
        data.image = req.file.filename;

        // User informations validation
        if (data["workTime.from"] || data["workTime.to"]) {
            data.workTime = { from: data["workTime.from"], to: data["workTime.to"] };
            delete data["workTime.from"];
            delete data["workTime.to"];
        };

        if (data?.username) data.username = await validate.usernameValidator(data.username);
        if (data?.phone) data.phone = await validate.phoneValidator(data.phone);
        if (data?.workTime) data.workTime = await validate.workTimeValidator(data.workTime);
        if (data?.password) data.password = await bcrypt.hash(data.password, 10);

        // Check if doctor already exists
        const existingDoctor = await Doctor.findOne({ username: data.username });
        if (existingDoctor) throw { message: 'Doctor with this username already exists!' };

        // Creating new doctor
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.json({ error: false, message: "You have successfully added a new doctor!", doctor });
    } catch (error) {
        const message = validate.getErrorMessage(error);
        res.status(404).send({ error: true, message: message ? message : error.message });
    };
});

router.post("/update/:id", fileUpload.single("image"), async (req, res) => {
    try {
        const updates = req.body;

        // File uploading
        if (req.file) {
            if (!["image/jpeg", "image/png", "image/jpg"].includes(req.file.mimetype)) {
                fs.unlinkSync(folder + req.file.filename);
                throw { message: "You can upload only image files!" };
            };
            updates.image = req.file.filename;
            const doctor = await Doctor.findById(req.params.id);
            if (fs.existsSync(folder + doctor.image)) fs.unlinkSync(folder + doctor.image);
        };

        // User informations validation
        if (updates["workTime.from"] || updates["workTime.to"]) {
            updates.workTime = { from: updates["workTime.from"], to: updates["workTime.to"] };
            delete updates["workTime.from"];
            delete updates["workTime.to"];
        };

        if (updates?.username) updates.username = await validate.usernameValidator(updates.username);
        if (updates?.phone) updates.phone = await validate.phoneValidator(updates.phone);
        if (updates?.workTime) updates.workTime = await validate.workTimeValidator(updates.workTime);
        if (updates?.password) updates.password = await bcrypt.hash(updates.password, 10);

        // Check if doctor already exists
        let existingDoctor = await Doctor.findOne({ username: updates.username });
        if (existingDoctor && existingDoctor._id == req.params?.id) existingDoctor = false;
        if (existingDoctor) throw { message: 'Doctor with this username already exists!' };

        // User updating
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDoctor) throw { message: "Doctor not found!" };
        res.json({ error: false, message: "You have successfully updated the doctor!", doctor: updatedDoctor });
    } catch (error) {
        const message = validate.getErrorMessage(error);
        res.status(404).send({ error: true, message: message ? message : error.message });
    };
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) throw { message: "Doctor not found!" };
        res.json({ error: false, message: "You have successfully deleted the doctor!", doctor: deletedDoctor });
        if (fs.existsSync(folder + deletedDoctor.image)) fs.unlinkSync(folder + deletedDoctor.image);
    } catch (error) {
        res.status(404).send({ error: true, message: error.message });
    };
});

module.exports = router;