const { Router } = require("express");
const router = new Router();
const Hospital = require("../models/Hospital");

router.get("/", async (req, res) => {
    const hospitals = await Hospital.find();
    res.json({ error: false, hospitals });
});


router.get("/:id", async (req, res) => {
    const hospital = await Hospital.findById(req.params.id);
    res.json({ error: false, hospital });
});

module.exports = router;
