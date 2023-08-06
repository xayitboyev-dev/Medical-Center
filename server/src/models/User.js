const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        minlength: [5, "Username must be at least 5 length!"],
        maxlength: [50, "Username must be at most 50 length!"],
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    telegramId: Number,
    name: {
        type: String,
        required: true,
        minlength: [2, "Name must be at least 2 length!"],
        maxlength: [100, "Name must be at most 100 length!"],
    },
    surname: {
        type: String,
        required: true,
        minlength: [2, "Surname must be at least 2 length!"],
        maxlength: [100, "Surname must be at most 100 length!"]
    },
    role: {
        type: String,
        default: "user",
    }
});

module.exports = mongoose.model('user', userSchema);