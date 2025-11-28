module.exports = (action, callback) => {

    if (typeof global.__noPrivAjax == 'undefined') {
        global.__noPrivAjax = {};
    }

    global.__noPrivAjax[action] = callback;

}