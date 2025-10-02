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

const get_template_part = async (path,viewContext) => {
    const ejxstring = fs.readFileSync(global.__app_path + path + '.ejs', 'utf8');
    return await renderAsync(ejxstring,viewContext);;
}

const get_admin_stylesheets = () => {
    return '';
}



const view = async (path,data,context) => {

    const splitPath = path.split('/');
    const pathPartsLength = splitPath.length - 1;
    const basename = splitPath[0];

    const extension = getExtension(path);
    
    const ejxstring = fs.readFileSync(global.__app_path + path + '.ejs', 'utf8');
    
    const viewContext = {
    "__":__,
    get_template_part,
    do_admin_stylesheets,
    do_admin_scripts,
    get_option,
    global,
    data,
    context,
    adminURL: global.__env.ADMIN_URL
    }
    viewContext.viewContext = viewContext;

    const renderTemplate = await renderAsync(ejxstring,viewContext);
   
    context.res.send(renderTemplate);
    
}

module.exports = view;