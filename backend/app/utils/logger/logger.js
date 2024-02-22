const log = (level, req, message) => {
    const colors = {
        error: "\x1b[31m", // red
        warn: "\x1b[33m", // yellow
        info: "\x1b[37m", // white
        success: "\x1b[32m", // green
    };

    const logLevel = colors[level] || "";
    const logMessage = `${logLevel}[${new Date().toLocaleString()}] ${req.originalUrl} ${message} \x1b[0m`;

    console.log(logMessage);
};

exports.error = (req, message) => log("error", req, message);
exports.warn = (req, message) => log("warn", req, message);
exports.info = (req, message) => log("info", req, message);
exports.success = (req, message) => log("success", req, message);