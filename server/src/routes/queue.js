const { Router } = require("express");
const router = new Router();
const Queue = require("../models/Queue");
const Doctor = require("../models/Doctor");
const getTime = require("../utils/getTime");
const validate = require("../utils/validate");
const sendNotification = require("../utils/sendNotification");
const findQueueToday = require("../utils/findQueueToday");

router.get("/", async (req, res) => {
    try {
        const myQueues = await findQueueToday(null, req.user?._id).populate("customer").populate({
            path: 'doctor', populate: { path: 'service hospital', }
        });
        res.json({ error: false, queues: myQueues });
    } catch (error) {
        res.status(404).json({ error: true, message: error.message });
    };
});

router.get("/:id", async (req, res) => {
    try {
        let queues = await findQueueToday(req.params?.id).populate("customer").populate({
            path: 'doctor', populate: { path: 'service hospital', }
        });
        queues = JSON.parse(JSON.stringify(queues));
        let queue;
        for (let i = 0; i < queues.length; i++) {
            const item = queues[i];
            if (item.customer?._id == req.user?._id) {
                queue = { ...item, number: i + 1, customersCount: queues.length };
                break;
            };
        };
        res.json({ error: false, queue: queue || "empty" });
    } catch (error) {
        res.status(404).json({ error: true, message: error.message });
    };
});

router.post("/:id/add", async (req, res) => {
    try {
        // doctor checking
        const doctor = await Doctor.findById(req.params.id);
        const today = getTime().toLocaleString("default", { weekday: "long" }).toLowerCase().slice(0, 2);
        if (!doctor?.workDays[today]) throw { message: "This doctor is not work today." };
        if (!doctor) throw { message: "Doctor not found!" };
        if (!doctor?.dailyQueue) doctor.dailyQueue = 10;

        // get queue
        const todayQueues = await findQueueToday(req.params.id);
        if (todayQueues.length >= doctor.dailyQueue) throw { message: "Doctor's daily clients are full, please try again tomorrow!" };
        if (todayQueues.find((item) => item.customer._id == req.user?._id)) throw { message: "You have already booked today!, please try again tomorrow!" };
        const date = getTime();

        const queue = new Queue({
            customer: req.user?._id,
            doctor: req.params.id,
            applicationText: req.body?.applicationText,
            date: date,
            chequeTime: date.toLocaleString(),
        });

        await queue.save();

        res.json({ error: false, message: "You have successfully booked!", queue });
        if (req.user?.telegramId) sendNotification(req.user?._id, `You have successfully booked!`);
    } catch (error) {
        const message = validate.getErrorMessage(error);
        res.status(message ? 404 : 500).json({ error: true, message: message ? message : error.message });
    };
});

router.delete("/cancel/:queueId", async (req, res) => {
    try {
        const queue = await Queue.findOneAndDelete({ _id: req.params.queueId, customer: req.user?._id });
        if (queue) res.json({ error: false, message: "You have successfully deleted!", queue });
        else res.status(404).json({ error: true, message: "Couldn't find queue!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

module.exports = router;