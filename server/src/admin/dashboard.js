const { Router } = require("express");
const router = new Router();
const auth = require("./middlewares/auth");
const hospital = require("./routes/hospitals");
const service = require("./routes/services");
const doctor = require("./routes/doctors");

router.use(auth);

router.get("/", (req, res) => {
    res.json({ error: false, message: "This is a dashboard!" });
});

router.use("/hospital", hospital);

router.use("/service", service);

router.use("/doctor", doctor);

module.exports = router;