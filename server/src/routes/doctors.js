const { Router } = require("express");
const router = new Router();
const Doctor = require("../models/Doctor");
const findQueueToday = require("../utils/findQueueToday");

router.get("/", async (req, res) => {
    try {
        let doctors = await Doctor.find().populate("hospital service").select({ "workDays._id": 0 });
        res.json({ error: false, doctors });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ error: true, message: "Invalid params!" });
    };
});

router.get("/filter", async (req, res) => {
    try {
        // Preparing queries!
        const itemsPerPage = req.query.count ? parseInt(req.query.count) : 6; // Number of items per page
        let { hospital, service, page, search = "" } = req.query;
        let filterParam1 = hospital ? "hospital" : "test1";
        let filterParam2 = service ? "service" : "test2";

        if (page) page = parseInt(page);
        else page = 1;

        let items = await Doctor.find({ [filterParam1]: hospital, [filterParam2]: service, $or: [{ name: { $regex: search, $options: 'i' } }, { surname: { $regex: search, $options: 'i' } }, { phone: { $regex: search, $options: 'i' } },] }).populate("hospital service").select({ "workDays._id": 0 });
        items = JSON.parse(JSON.stringify(items));
        items = items.filter((item) => item.service && item.hospital);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const paginatedItems = items.slice(startIndex, endIndex);

        res.json({ currentPage: page, totalItems: items.length, totalPages: Math.ceil(items.length / itemsPerPage), items: paginatedItems, });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

router.get("/:id", async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ _id: req.params.id }).populate("hospital service").select({ "workDays._id": 0 });
        if (doctor) {
            const queues = JSON.parse(JSON.stringify(await findQueueToday(doctor._id)));
            let currentQueue = (queues.findIndex((item) => item.status == "waiting")) + 1;
            if (currentQueue <= 0) currentQueue = "All completed";
            let prevDuration = queues.findLastIndex((item) => item.durationTime);
            const time = queues[prevDuration]?.durationTime;
            res.json({ error: false, currentQueue, prevDuration: { queueNumber: prevDuration + 1, time: time ? time : "No prev queue" }, customersCount: queues?.length, doctor: doctor });
        } else res.status(404).json({ error: true, message: "Doctor not found!" });
    } catch (error) {
        res.json({ error: true, message: error.message });
    };
});

module.exports = router;