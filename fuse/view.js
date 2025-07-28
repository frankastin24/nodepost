const parseJSX = require('./parseJSX');
const fs = require('fs');
const getExtension = (path) => {
    const splitPath = path.split('.');
    return splitPath.length == 1 ? 'jsx' : splitPath[1];
}
const __ = require('../np-includes/__')

const nodeContext = {
    "__":__
}

const view = (path) => {

    const splitPath = path.split('/');
    const pathPartsLength = splitPath.length - 1;
    const basename = splitPath[0];

    const extension = getExtension(path);
    
    const JSX = fs.readFileSync(global.__app_path + path + '.jsx', 'utf8');

    global.__express_res.send(parseJSX(JSX,nodeContext));
       

}

module.exports = view;