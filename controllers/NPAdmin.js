const admin_views_path = '/np-content/admin/';
const view = require('../fuse/view');
const updateEnvVariable = require('../fuse/enviromentals');
class NPAdmin {

    static install(request) {
        view(admin_views_path + 'install');
    }

    static adminMenu() {
        const add_action = require('../np-includes/addAction')

        add_action('admin_menu', async () => {
            
            global.admin_menu = [];
            
            
            
            global.__cpts.forEach((CPT) => {
                global.admin_menu.push({
                    pageName : CPT.pageName,
                    dashIcon : false,
                    subMenu : [
                        {
                            pageName: 'View All',
                            pageURL : 'view-all/'+CPT.slug
                        },
                        {
                            pageName: 'Create New',
                            pageURL : 'create-new/'+CPT.slug
                        },
                    ]
                })
            })
 
            global.admin_menu.push({
                pageName : 'Themes',
                dashIcon : 'theme',
                subMenu: [
                    {
                            pageName: 'View All',
                            pageURL : 'themes/view-all'
                    },
                    {
                            pageName: 'Add New',
                            pageURL : 'themes/add'
                    },
                ] 
            })

            global.admin_menu.push({
                pageName : 'Plugins',
                dashIcon : 'plugin',
                subMenu: [
                    {
                            pageName: 'View All',
                            pageURL : 'plugins/view-all'
                    },
                    {
                            pageName: 'Add New',
                            pageURL : 'plugins/add'
                    },
                ] 
            })

            global.admin_menu.push({
                pageName : 'Settings',
                dashIcon : 'setting',
                subMenu: [
                    {
                            pageName: 'General',
                            pageURL : 'settings/general'
                    },
                    {
                            pageName: 'SMPT',
                            pageURL : 'settings/smpt'
                    },
                ] 
            })
        }, 0);
    }

    static async index(request) {
        const do_action = require('../np-includes/doAction')

        NPAdmin.adminMenu();

        const CustomPostType = require('../models/CustomPostType')

        global.__cpts = await CustomPostType.findAll();
        
         do_action('admin_menu');

        if(request.param1 == 'post') {
            
            const currentPost =  get_post(request.param2);

            global.post = currentPost;

            return view(admin_views_path + 'post');

        } 

        if(request.param1 == 'view-all') {
            
            const currentCPT =  get_cpt(request.param2);

            global.cpt = currentCPT;

            return view(admin_views_path + 'view-all');

        } 

        if(request.param1 == 'settings') {
            
            const currentCPT =  get_cpt(request.param2);

            global.settingsPage = currentCPT;

            return view(admin_views_path + 'post');

        }
        
       

        await view(admin_views_path + 'home');
    }
    
    static saveSiteTitle(request,req,res) {

       const {update_option} = require('../np-includes/options')
       
       update_option('site_title',request.site_title);
       update_option('tag_line',request.tag_line);
       res.send('{"success" : true}');
       
    }

    static startWithIgnition(request,req,res) {
        const {update_option} = require('../np-includes/options')
        update_option('active_theme','igition');
        update_option('has_theme_activated',false);

        updateEnvVariable('INSTALL_COMPLETE', 'true');
        
        res.send('{"success" : true}');
    }

    static startWithPageBuilder(request,req,res) {
        const {update_option} = require('../np-includes/options')
        update_option('active_theme','pagebuilder');
        update_option('has_theme_activated',false);
        updateEnvVariable('INSTALL_COMPLETE', 'true');
        res.send('{"success" : true}');
    }

} 

module.exports = NPAdmin;
 