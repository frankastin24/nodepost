const admin_views_path = global.app_path + '/np-admin/views/';
const view = require('../fuse/view');
class NPAdmin {

    static home(request) {

        if(global.__env.INSTALL_COMPLETE == 'false') {

        }

    }

    static install(request) {
        view(admin_views_path + 'install');
    }

    static save(request) {
        request.site_name
    }

    static post(request) {
        //Find post set global

    }
} 

module.exports = NPAdmin;
 