require("dotenv").config({ path: __dirname + "/../config/.env" });
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const User = require("../models/User");

bot.start(async (ctx) => {
    try {
        ctx.reply("🛎 Medical Center saytidan xabarnomalarni qabul qilib olish uchun botga xush kelibsiz!");
        if (ctx.startPayload) {
            const user = await User.findById(ctx.startPayload);
            if (user) {
                if (user.telegramId == ctx.chat?.id) return ctx.reply("☑️ Botga allaqachon ushbu hisob ulangan!");
                user.telegramId = ctx.chat?.id;
                await user.save();
                ctx.reply("✅ Saytdagi hisobingiz telegram botga muvaffaqqiyatli ulandi. Endi xabarnomalarni ushbu botdan olishingiz mumkin!");
            } else {
                ctx.reply("❗️ Saytda ushbu foydalanuvchi topilmadi!");
            };
        };
    } catch (error) {
        console.log("Error on telegram bot start:", error.message);
    };
});

bot.launch();

module.exports = bot;