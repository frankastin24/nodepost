const fs = require('fs');

module.exports = (file_info, error) => {

    const now = new Date();
    const datetime = now.toLocaleString();
    const logPath = '../np_error.log';
    fs.appendFile(logPath, `${datetime} - ${file_info} - ${error}/n`);
    console.log(`${file_info} - ${error}`);
}