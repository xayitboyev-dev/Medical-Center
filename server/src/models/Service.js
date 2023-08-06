const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 150,
        required: true,
    },
    hospital: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "hospital"
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = model("service", serviceSchema);