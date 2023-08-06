const { Schema, model } = require("mongoose");

const hospitalSchema = new Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 150,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
});

module.exports = model("hospital", hospitalSchema);