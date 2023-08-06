const { Router } = require("express");
const router = new Router();
const Service = require("../models/Service");

router.get("/", async (req, res) => {
    const services = await Service.find().populate("hospital");
    res.json({ error: false, services });
});

router.get("/filter", async (req, res) => {
    try {
        const { hospital } = req.query;
        const services = await Service.find({ hospital });
        res.json({ error: false, services });
    } catch (error) {
        res.status(404).json({ error: true, message: "Invalid hospital id!" });
    };
});

module.exports = router;