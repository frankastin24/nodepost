const view = require('../fuse/view');
const loadAdmin = () => {

    const admin_path = global.app_path + '/np-admin/views/';
    
    if(global.request.pathSections.length > 1) {
        const page = global.request.pathSections[2];
        switch(page) {

            case 'install' :

                return view(admin_path + 'install');

            break;

        }
        
    }

    if(global.__env.INSTALL_COMPLETE == 'false') {

    }
}