module.exports = (name,url,dependancies,in_footer) => {
    if(typeof global.admin_scripts == 'undefined') {
        global.admin_scripts = [];
    }

    global.admin_scripts.push({
        name,
        url,
        dependancies,
        in_footer
    })
} 