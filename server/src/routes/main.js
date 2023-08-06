const { Router } = require("express");
const router = new Router();
const admin = require("../admin/dashboard");
const profile = require("./profile");
const doctor = require("./doctor/index");
const hospitals = require("./hospitals");
const services = require("./services");
const doctors = require("./doctors");
const queue = require("./queue");
const authRoute = require("../routes/auth/index");
const authMiddleware = require('../middlewares/auth');
const userAuth = require('../middlewares/userAuth');

router.use("/auth", authRoute);

router.use("/services", services);

router.use("/hospitals", hospitals);

router.use("/doctors", doctors);

router.use(authMiddleware);

router.use("/admin", admin);

router.use("/doctor", doctor);

router.use("/profile", profile);

router.get("/", (req, res) => res.json({ error: false, message: "Welcome to Homepage! You are a "+ req.user?.role, profile: req.user }));

router.use(userAuth);

router.use("/queue", queue);

module.exports = router;