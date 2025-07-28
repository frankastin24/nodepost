const router = require('./fuse/routing');
const NPLoad = require('./controllers/NPLoad')
const NPAdmin = require('./controllers/NPAdmin')
/* 

Admin Routes

*/

const adminURL = global.__env.ADMIN_URL;

router.get(`/${adminURL}/install`,NPAdmin.install)
router.get(`/${adminURL}/[page]`,NPAdmin.index)
router.get(`/${adminURL}`,NPAdmin.index)
router.get(`/${adminURL}/post/[post_id]`,NPAdmin.post)

router.post('/api/np-admin/save',NPAdmin.save );

/*
Load site
*/

router.get('/',NPLoad.init);
router.get('/[urlParam1]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]/[urlParam3]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]/[urlParam3]/[urlParam4]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]/[urlParam3]/[urlParam4]/[urlParam5]',NPLoad.init)

