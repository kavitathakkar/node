const fs = require('fs');

function requestLogger(req, res, next) {
const logMessage = `${req.method} ${req.url} - ${new Date().toISOString()}\n`;

fs.appendFile('requestLogger.log', logMessage, (err) => {
if(err){
console.error('Error writing to requestLogger', err)
}
});
next();
};

module.exports = requestLogger;
