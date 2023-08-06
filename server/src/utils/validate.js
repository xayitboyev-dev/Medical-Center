const getTime = require("../utils/getTime");
const usernameRegex = /^[a-zA-Z0-9]+$/;
const phoneRegex = /^[0-9]+$/;

exports.usernameValidator = async (username) => {
    if (!usernameRegex.test(username)) throw { message: "Username format is incorrect!" };
    return username;
};

exports.phoneValidator = async (phone) => {
    if (!phoneRegex.test(phone)) throw { message: "Phone format is incorrect!" };
    if (phone?.length !== 9) throw { message: "Phone number must be 9 in length!" };
    phone = "+998" + phone;
    return phone;
};

exports.workTimeValidator = async (time) => {
    const from = getTime("0 " + time.from);
    const to = getTime("0 " + time.to);

    if (from && to && from < to) {
        return { from: formatter(from), to: formatter(to) };
    } else {
        throw { message: "Invalid work time!" };
    };
};

exports.getErrorMessage = (error) => {
    try {
        if (!error?.errors) return false;
        const keys = Object.keys(error.errors);
        return error.errors[keys[keys?.length - 1]]?.message;
    } catch (error) {
        return error.message;
    };
};

function formatter(time) {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return hours + ":" + minutes;
};