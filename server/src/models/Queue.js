const { Schema, model } = require("mongoose");

const queueSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "doctor",
    },
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    applicationText: {
        type: String,
        required: true,
        minlength: [10, "Application text must be at least 10 length!"],
        maxlength: [200, "Application text must be at least 200 length!"]
    },
    diagnosis: String,
    startTime: Date,
    durationTime: String,
    date: {
        type: Date,
        required: true,
    },
    chequeTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "waiting"
    }
});

module.exports = model("queue", queueSchema);