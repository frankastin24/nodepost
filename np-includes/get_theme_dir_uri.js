const {get_option} = require('./options');
module.exports = () => {
    return '/np-content/themes/' + global.__active_theme + '/'; 
}