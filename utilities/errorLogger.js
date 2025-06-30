const fs = require('fs');
const logError = (error, req, res, next) => {
const errorMessage = `${new Date().toISOString()} - ${error}\n`;

fs.appendFile('errorLogger.log', errorMessage, (err) => {
if(err){
console.error('Failed to log error', err)
}
});
next(error);
};

module.exports = logError;
