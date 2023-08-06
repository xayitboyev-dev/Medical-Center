const getTime = require("./getTime");
const Queue = require("../models/Queue");

module.exports = function (doctor, customer) {
    const date = getTime();
    const nextDay = getTime();
    date.setHours(0, 0, 0);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0);

    //query today up to tonight
    const filter = { date: { $gte: date, $lt: nextDay } };

    if (doctor && customer) return Queue.find({ ...filter, doctor, customer }).populate("customer");
    if (doctor) return Queue.find({ ...filter, doctor }).populate("customer");
    if (customer) return Queue.find({ ...filter, customer }).populate("customer");
    throw { message: "Filter queries error!" };
};