const multer = require("multer");
const fs = require("fs");
const folder = __dirname + "/../../uploads/";

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

module.exports = { fileUpload: multer({ storage }), folder };