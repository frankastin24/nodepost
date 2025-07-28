if(typeof global.__actions == 'undefined') {
    global.__actions = {};
}

module.exports = (...params) => {
    const action = params[0];
    const callback = params[1];
    const priority = params[2];
    const extraParams = params.slice(3);

    if (typeof global.__actions[action] === 'undefined') {
        global.__actions[action] = {};
    }
    const length = Object.keys(global.__actions[action]).length;

    global.__actions[action][length] = {
        callback,
        priority,
        params: extraParams
    };
};