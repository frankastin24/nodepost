module.exports = async (action,req,res) => {
    if (typeof global.__actions[action] === 'undefined') return;

    let output = '';
    const callables = sortCallables(global.__actions[action]);

    for (const callable of callables) {
        output += await callable.callback(req,res);
    }

    return output;
};

// Helper to sort callables by their priority
function sortCallables(obj) {
    // Convert object to array for sorting
    const arr = Object.values(obj);
    // Sort array by priority (lowest first)
    arr.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    return arr;
}