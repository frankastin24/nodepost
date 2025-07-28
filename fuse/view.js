const parseJSX = require('./parseJSX');

const getExtension = (path) => {
    const splitPath = path.split('.');
    return splitPath.length == 1 ? 'jsx' : splitPath[1];
}

const view = (path) => {

    const splitPath = path.split('/');
    const pathPartsLength = splitPath.length - 1;
    const basename = splitPath[0];

    const extension = getExtension(path);

    const theme_dir = '../np_content/themes/'+global.theme_dir+'/';

    if(pathPartsLength == 0) {

        if(extension == 'jsx') {

            const JSX = FS.readSync(global.theme_dir + path);

            global.express_res.send(parseJSX(JSX));
        
        }

    } else {

    }

}

module.exports = view;