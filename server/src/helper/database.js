const mongoose = require('mongoose');

module.exports = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database!');
    } catch (error) {
        console.error('MongoDB connecting error:', error.message);
        process.exit(1);
    };
};