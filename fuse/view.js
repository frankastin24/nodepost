let {renderAsync} = require('./ejsCompiler');
const fs = require('fs');
const getExtension = (path) => {
    const splitPath = path.split('.');
    return splitPath.length == 1 ? 'jsx' : splitPath[1];
}

const __ = require('../np-includes/__')

const do_admin_stylesheets = require('../np-includes/do_admin_stylesheets')

const do_admin_scripts = require('../np-includes/do_admin_scripts')
const {get_option} = require('../np-includes/options');

const get_template_part = async (path) => {
    const ejxstring = fs.readFileSync(global.__app_path + path + '.ejs', 'utf8');
    return await renderAsync(ejxstring,nodeContext);;
}

const get_admin_stylesheets = () => {
    return '';
}

const nodeContext = {
    "__":__,
    get_template_part,
    do_admin_stylesheets,
    do_admin_scripts,
    get_option,
    global
}

const view = async (path) => {

    const splitPath = path.split('/');
    const pathPartsLength = splitPath.length - 1;
    const basename = splitPath[0];

    const extension = getExtension(path);
    
    const ejxstring = fs.readFileSync(global.__app_path + path + '.ejs', 'utf8');

    const renderTemplate = await renderAsync(ejxstring,nodeContext);

    global.__express_res.send(renderTemplate);
    
}

module.exports = view;