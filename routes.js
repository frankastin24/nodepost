const router = require('./fuse/routing');
const NPLoad = require('./controllers/NPLoad')
const NPAdmin = require('./controllers/NPAdmin')

/* 

Admin Routes

*/

const adminURL = global.__env.ADMIN_URL;

router.get(`/${adminURL}/install`,NPAdmin.install)

router.get(`/${adminURL}`,NPAdmin.index)

router.get(`/${adminURL}/[param1]/[param2]`,NPAdmin.index)

router.get(`/${adminURL}/[param1]/[param2]/[param3]`,NPAdmin.index)

router.post('/api/np-admin/save-site-title',NPAdmin.saveSiteTitle );
router.post('/api/np-admin/start-with-ignition', NPAdmin.startWithIgnition );
router.post('/api/np-admin/start-with-page-builder', NPAdmin.startWithPageBuilder );

/*
Load site
*/

router.get('/',NPLoad.init);
router.get('/[urlParam1]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]/[urlParam3]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]/[urlParam3]/[urlParam4]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]/[urlParam3]/[urlParam4]/[urlParam5]',NPLoad.init)

