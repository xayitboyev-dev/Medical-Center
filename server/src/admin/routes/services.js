const { Router } = require("express");
const router = new Router();
const Service = require("../../models/Service");
const validate = require("../../utils/validate");

router.get("/", async (req, res) => {
    let services = await Service.find().populate("hospital");
    services = JSON.parse(JSON.stringify(services));
    services = services.filter((item) => item.hospital);
    res.json({ error: false, services });
});

router.post("/add", async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.json({ error: false, service });
    } catch (error) {
        const message = validate.getErrorMessage(error);
        res.status(404).send({ error: true, message: message ? message : error.message });
    };
});

router.post("/update/:id", async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedService) throw { message: "Service not found!" };
        res.json({ error: false, message: "You have successfully updated the service!", service: updatedService });
    } catch (error) {
        const message = validate.getErrorMessage(error);
        res.status(404).send({ error: true, message: message ? message : error.message });
    };
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) throw { message: "Service not found!" };
        res.json({ error: false, message: "You have successfully deleted the service!", service: deletedService });
    } catch (error) {
        res.status(404).send({ error: true, message: error.message });
    };
});

module.exports = router;