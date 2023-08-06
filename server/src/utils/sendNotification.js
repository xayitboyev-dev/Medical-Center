const User = require("../models/User");
const bot = require("../bot/bot");

module.exports = async (userId, message) => {
    try {
        const user = await User.findById(userId);
        if (user) {
            if (!user?.telegramId) throw "user's telegram id unavailable!";
            bot.telegram.sendMessage(user.telegramId, message, { parse_mode: "HTML" });
        } else throw { message: "User not found" };
    } catch (error) {
        console.log("Error occured while trying to send notification:", error);
    };
};