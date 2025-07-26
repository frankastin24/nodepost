const npError = require('./npError');

if(typeof global.rewrites == 'undefined') {
    global.rewrites = {};
}

module.exports = (regex, redirect) => {
     
     if(typeof global.rewrites[regex] != 'undefined') {
         return npError(__dir + 'addRewrite.js:7','Regex has route assigned');
     }

     global.rewrites[regex] = redirect;

}