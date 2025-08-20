module.exports = (name,url,dependancies) => {
    if(typeof global.admin_stylesheets == 'undefined') {
        global.admin_stylesheets = [];
    }

    global.admin_stylesheets.push({
        name,
        url,
        dependancies
    })
} 