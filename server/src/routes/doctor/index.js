const { Router } = require("express");
const router = new Router();
const doctorAuth = require("../../middlewares/doctorAuth");
const findQueueToday = require("../../utils/findQueueToday");
const Queue = require("../../models/Queue");
const getTime = require("../../utils/getTime");
const durationCalculator = require("../../utils/durationCalculator");
const sendNotification = require("../../utils/sendNotification");

router.use(doctorAuth);

router.get('/', (req, res) => {
    res.json({ error: false, message: "This is doctor page!" });
});

router.get("/customers", async (req, res) => {
    try {
        const customers = await findQueueToday(req.user?._id);
        res.json({ error: false, customers });
    } catch (error) {
        res.status(404).json({ error: true, message: error.message });
    };
});

router.get("/customers/:customerId", async (req, res) => {
    try {
        const queues = await Queue.find({ customer: req.params.customerId, status: "completed" });
        res.json({ error: false, queues });
    } catch (error) {
        res.status(404).json({ error: true, message: error.message });
    };
});

router.post("/customers/:queueId/start", async (req, res) => {
    try {
        // queue checking
        const queues = await findQueueToday(req.user?._id);
        const queue = queues.find((item) => item._id == req.params.queueId);
        const startedQueue = queues.find((item) => item.status == "looking");
        if (queue?.status == "completed") return res.status(404).json({ error: true, message: "This queue has already completed!" });
        if (!queue) throw { message: "Queue not found!" };
        if (startedQueue) throw { message: startedQueue._id == req.params.queueId ? "This queue has already started!" : "Already started other queue!" };

        // updating the queue
        const updatedQueue = await Queue.findOneAndUpdate({ _id: queue._id }, { status: "looking", startTime: getTime() }, { new: true });
        if (updatedQueue) {
            res.status(200).json({ error: false, message: "You have successfully started the queue!", queue: updatedQueue });
            sendNotification(queue?.customer?._id, `❕ Sizning navbatingiz keldi.\n\nShifokor: ${req?.user?.name}\nXona: ${req?.user?.roomNumber}\nVaqt: ${getTime(updatedQueue?.startTime).toLocaleString()}`);
        }
        else throw { message: "Queue not found!!" };
    } catch (error) {
        res.status(404).json({ error: true, message: error.message });
    };
});

router.post("/customers/:queueId/complete", async (req, res) => {
    try {
        // queue checking
        if (!req.body.diagnosis) throw { message: "Path 'diagnosis' is required!" };
        const queue = await Queue.findOne({ _id: req.params.queueId });
        if (!queue) return res.status(404).json({ error: true, message: "Queue not found!" });
        if (queue._id == req.params.queueId && queue.status != "looking") return res.status(404).json({ error: true, message: "This queue has already completed!" });
        if (queue.status != "looking") return res.status(404).json({ error: true, message: "This queue has not yet started. Please before start that queue!" });
        const durationTime = durationCalculator(queue.startTime, getTime());

        // updating the queue
        const updatedQueue = await Queue.findOneAndUpdate({ _id: req.params.queueId }, { status: "completed", durationTime, diagnosis: req.body.diagnosis }, { new: true });
        if (updatedQueue) res.status(200).json({ error: false, message: "You have successfully completed the queue!", queue: updatedQueue });
        else res.status(404).json({ error: true, message: "Queue not found!" });
    } catch (error) {
        res.status(404).json({ error: true, message: error.message });
    };
});

router.delete("/customers/:queueId/cancel", async (req, res) => {
    try {
        const deletedQueue = await Queue.findOneAndDelete({ _id: req.params.queueId, doctor: req.user?._id });
        if (deletedQueue) res.status(200).json({ error: false, message: "You have successfully deleted the queue!" });
        else res.status(404).json({ error: true, message: "Queue not found!" });
    } catch (error) {
        res.status(404).json({ error: true, message: error.message });
    };
});

router.use((req, res) => {
    res.status(404).json({ error: true, message: "404 error, Page not found!" });
})

module.exports = router;