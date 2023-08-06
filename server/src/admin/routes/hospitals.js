const { Router } = require("express");
const router = new Router();
const Hospital = require("../../models/Hospital");
const validate = require("../../utils/validate");
const { fileUpload, folder } = require("../middlewares/fileUpload");
const fs = require("fs");

router.get("/", async (req, res) => {
    const hospitals = await Hospital.find();
    res.json({ error: false, hospitals });
});

router.post("/add", fileUpload.single('logo'), async (req, res) => {
    try {
        if (!req.file) throw { message: "Logo is required!" };
        if (!["image/jpeg", "image/png", "image/jpg"].includes(req.file.mimetype)) {
            fs.unlinkSync(folder + req.file.filename);
            throw { message: "You can upload only image files!" };
        };
        req.body.logo = req.file.filename;
        const hospital = new Hospital(req.body);
        await hospital.save();
        res.json({ error: false, hospital });
    } catch (error) {
        const message = validate.getErrorMessage(error);
        res.status(404).send({ error: true, message: message ? message : error.message });
    };
});

router.post("/update/:id", fileUpload.single('logo'), async (req, res) => {
    try {
        if (req.file) {
            if (!["image/jpeg", "image/png", "image/jpg"].includes(req.file.mimetype)) {
                fs.unlinkSync(folder + req.file.filename);
                throw { message: "You can upload only image files!" };
            };
            req.body.logo = req.file.filename;
            const hospital = await Hospital.findById(req.params.id);
            if (fs.existsSync(folder + hospital.logo)) fs.unlinkSync(folder + hospital.logo);
        };

        const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHospital) throw { message: "Hospital not found!" };
        res.json({ error: false, message: "You have successfully updated the hospital!", hospital: updatedHospital });
    } catch (error) {
        const message = validate.getErrorMessage(error);
        res.status(404).send({ error: true, message: message ? message : error.message });
    };
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);
        if (!deletedHospital) throw { message: "Hospital not found!" };
        res.json({ error: false, message: "You have successfully deleted the hospital!", hospital: deletedHospital });
        if (fs.existsSync(folder + deletedHospital.logo)) fs.unlinkSync(folder + deletedHospital.logo);
    } catch (error) {
        res.status(404).send({ error: true, message: error.message });
    };
});

module.exports = router;