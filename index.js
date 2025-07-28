const scanAndRequire = require('./fuse/scanAndRequire');
const addAction = require('./np-includes/addAction');
//Load environmentals
global.__app_path = __dirname;
require('./fuse/enviromentals');
require('./fuse/db')
require('./routes')
//Load models
addAction('db_initalized', () => {
   scanAndRequire(global.__app_path+'/models');
})



//Load server

require('./fuse/server');