const {get_option} = require('./options');
module.exports = () => {
    return global.__app_path + '/np-content/themes/' + global.__active_theme + '/'; 
}