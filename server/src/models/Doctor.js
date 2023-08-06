const { Schema, model } = require("mongoose");

const doctorSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        minlength: [5, "Username must be at least 5 length!"],
        maxlength: [50, "Username must be at most 50 length!"],
        unique: true,
        required: true,
    },
    name: {
        type: String,
        minlength: [2, "Name must be at least 2 length!"],
        maxlength: [150, "Name must be at most 150 length!"],
        required: true,
    },
    surname: {
        type: String,
        minlength: [2, "Surname must be at least 2 length!"],
        maxlength: [150, "Surname must be at most 150 length!"],
        required: true,
    },
    service: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "service"
    },
    hospital: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "hospital"
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    workTime: {
        type: {
            from: {
                type: String,
                required: true,
            },
            to: {
                type: String,
                required: true,
            }
        },
        required: true
    },
    workDays: {
        type: {
            mo: { type: Boolean, default: false },
            tu: { type: Boolean, default: false },
            we: { type: Boolean, default: false },
            th: { type: Boolean, default: false },
            fr: { type: Boolean, default: false },
            sa: { type: Boolean, default: false },
            su: { type: Boolean, default: false },
        },
        required: true
    },
    floorNumber: {
        type: Number,
        required: true
    },
    roomNumber: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "doctor"
    },
    dailyQueue: {
        type: Number,
        required: true
    }
});

module.exports = model("doctor", doctorSchema);