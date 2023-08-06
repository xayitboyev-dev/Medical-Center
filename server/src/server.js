const http = require('http');
const app = require('./app');

require("dotenv").config({ path: __dirname + "/config/.env" });
require("./helper/database")(process.env.MONGO_URL);

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});
server.listen(port);

// port normalizer function
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// error handler function
function errorHandler() {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

process.on("unhandledRejection", (err) => console.log('unhandledRejection:', err));

process.on("uncaughtException", (err) => console.log('uncaughtException', err));