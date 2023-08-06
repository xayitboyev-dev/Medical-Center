const { Router } = require("express");
const router = new Router();

router.get("/error/400", (req, res) => {
    res.status(400).json({ error: true, message: "400 Bad Request!" })
});

router.get("/error/401", (req, res) => {
    res.status(400).json({ error: true, message: "401 Unauthorized!" })
});

router.get("/error/404", (req, res) => {
    res.status(404).json({ error: true, message: "404 Not found!" })
});

router.use((req, res) => {
    res.status(404).json({ error: true, message: "Error, page not found!" })
});

module.exports = router;