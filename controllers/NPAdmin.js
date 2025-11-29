const admin_views_path = '/np-content/admin/';
const view = require('../fuse/view');
const updateEnvVariable = require('../fuse/enviromentals');
const crypto = require('crypto')
const createPost = require('../np-includes/createPost');
const Post = require('../models/Post')
const { addAjax } = require('../np-includes/addAjax');
const adminMenu = require('../np-includes/adminMenu');
const loginUser = require('../np-includes/loginUser');
const addNoPrivAjax = require('../np-includes/addNoPrivAjax');
const updateEnviromental = require('../fuse/enviromentals');
const fs = require('fs')
class NPAdmin {

    static install(request, context) {
        view(admin_views_path + 'install', {}, context);
    }

    static noPrivAjax(request,context) {
      
        if(global.__noPrivAjax && global.__noPrivAjax[request.action]) {
            global.__noPrivAjax[request.action](context,request);
        } else {
            context.res.send('Action not found!');
        }
    } 

    static registerInstallAJAX() {

        const { update_option } = require('../np-includes/options')
        
        addNoPrivAjax('get_current_lang', (context) => {
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            context.res.send(global.__env.LANGUAGE);
        })
        
        addNoPrivAjax('get_install_step', (context) => {
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            context.res.send(global.__env.INSTALL_STEP);
        })
        
        addNoPrivAjax('set_current_lang', (context,request) => {
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            updateEnviromental('LANGUAGE', request.lang);
            context.res.send('true');
        })

         addNoPrivAjax('set_current_step', (context,request) => {
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            updateEnviromental('INSTALL_STEP', request.step);
            context.res.send('true');
        })

        addNoPrivAjax('set_current_lang', (context,request) => {
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
            updateEnviromental('LANGUAGE', request.lang);
            context.res.send('true');
        })

        addNoPrivAjax('set_database_creds', (context,request) => {
        
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
        
            updateEnviromental('DB_HOST', request.db_host);
            updateEnviromental('DB_USER', request.db_user);
            updateEnviromental('DB_NAME', request.db_name);
            updateEnviromental('DB_PASSWORD', request.db_password);
        
            context.res.send('true');
        
        })

        addNoPrivAjax('set_site_details', (context,request) => {
        
            if(global.__env.INSTALL_COMPLETE == 'true') {
                return context.send('Install Complete');
            }
        
            update_option('site_title', request.site_title);
            update_option('site_tag_line', request.site_tag_line);
        
            context.res.send('true');
        
        })

       

    }


    static login(request,context) {
         if(global.__env.INSTALL_COMPLETE = 'false') {
           return context.res.redirect(`/${global.__env.ADMIN_URL}/install`);
        }
        if(request.username) {
            const loginStatus = loginUser(context,request.username,request.password);
            if(loginStatus.error) {
                return view(admin_views_path + 'login', {message: loginStatus.message},context)
            }
        } else {
            return view(admin_views_path + 'login', {message: ''},context)
        }

    }

    static async index(request, context) {
        
        if(global.__env.INSTALL_COMPLETE = 'false') {
           return context.res.redirect(`/${global.__env.ADMIN_URL}/install`);
        }

        if (!context.req.session.userID || typeof context.req.session.userID == 'undefined') {
            
            return context.res.redirect(`/login`);

        }

        if (context.req.path.includes('np-ajax')) {

            if (typeof global.__ajax[request.action] !== 'undefined') {
                global.__ajax[request.action](context, request);
            } else {
                context.res.send('AJAX Action not found!');
            }

            return;
        }

        const do_action = require('../np-includes/doAction')

        adminMenu();

        const CustomPostType = require('../models/CustomPostType')

        global.__cpts = await CustomPostType.findAll();

        do_action('admin_menu');

        let offset, numPages, displayCPTs;

        if (request.param1 == 'create-post') {

            const cpt = global.__cpts.find((obj) => {
                return obj.slug == request.param2;
            })

            return view(admin_views_path + '/post-create', { basic_editor: true, cpt: cpt }, context);

        }

        if (request.param1 == 'cpt') {

            if (request.param2 == 'add') {
                return view(admin_views_path + '/cpt-new', {}, context);
            }

            if (request.param2 == 'view-all') {

                offset = 1;

                if (typeof request.param3 !== 'undefined') {
                    offset = parseInt(request.param3);
                }

                numPages = global.__cpts.length / 10;
                displayCPTs = [];

                global.__cpts.forEach((cpt, index) => {
                    if (index >= (offset - 1) && index <= (offset + 10)) {
                        displayCPTs.push({
                            id: cpt.id,
                            title: cpt.title,
                            slug: cpt.slug,
                            use_rest: cpt.use_rest,
                            top_level: cpt.top_level,
                            basic_editor: cpt.basic_editor,
                            page_builder: cpt.page_builder,
                        })
                    }
                });

                const data = {
                    cpts: displayCPTs,
                    pages: numPages,
                    currentPage: offset,
                }

                return view(admin_views_path + '/cpt-list', data, context);
            }

        }



        if (request.param1 == 'edit') {

            const currentPost = get_post(request.param2);

            global.post = currentPost;
            console.log('here')

            return view(admin_views_path + 'edit', {}, context);


        }

        if (request.param1 == 'view-all') {

            const posts = await Post.findAll({
                post_type: request.param2
            })

            return view(admin_views_path + 'post-list', { posts }, context);

        }

        if (request.param1 == 'settings') {

            const currentCPT = get_cpt(request.param2);

            global.settingsPage = currentCPT;

            return view(admin_views_path + 'post', {}, context);

        }

        await view(admin_views_path + 'home', {}, context);
    }


    static startWithIgnition(request, context) {
       update_option('active_theme', 'igition');
        update_option('has_theme_activated', false);

        updateEnvVariable('INSTALL_COMPLETE', 'true');

        context.res.send('{"success" : true}');
    }



    static startWithPageBuilder(request, context) {
        update_option('active_theme', 'pagebuilder');
        update_option('has_theme_activated', false);
        updateEnvVariable('INSTALL_COMPLETE', 'true');
        context.res.send('{"success" : true}');
    }

    static async addCPT(request, context) {
        const CustomPostType = require('../models/CustomPostType');

        const foundTitles = await CustomPostType.findAll({
            where: {
                title: request.title
            }
        })
        console.log(foundTitles);

        if (foundTitles.length > 0) {
            return context.res.send('Title already used!');
        }

        const foundSlugs = await CustomPostType.findAll({
            where: {
                slug: request.slug
            }
        })

        if (foundSlugs.length > 0) {
            return context.res.send('Slug already used!');
        }

        const newCPT = CustomPostType.build({
            title: request.title,
            slug: request.slug,
            menu_name: request.menu_name,
            basic_editor: request.basic_editor,
            page_builder: request.page_builder,
            use_rest: request.use_rest,
            top_level: request.top_level
        })

        await newCPT.save();

        context.res.send('success');
    }

    static async updateCPT(request, context) {

        const CustomPostType = require('../models/CustomPostType');

        const cpts = await CustomPostType.findAll({
            where: {
                id: parseInt(request.id)
            }
        })


        const cpt = cpts[0];
        cpt.title = request.title;
        cpt.slug = request.slug;
        cpt.use_rest = request.use_rest;
        cpt.top_level = request.top_level;
        cpt.basic_editor = request.basic_editor;
        cpt.page_builder = request.page_builder;
        cpt.save();

        context.res.send('success');
    }

    static async deleteCPT(request, context) {

        const CustomPostType = require('../models/CustomPostType');

        await CustomPostType.destroy({
            where: {
                id: parseInt(request.id)
            }
        })

        context.res.send('success');
    }

    static uploadFile(request, context) {

        const req = context.req;
        const res = context.res;


        const Busboy = require('busboy');
        const fs = require('fs');
        const path = require('path');

        const busboy = Busboy({ headers: req.headers });
        let filename = '';
        let folderPath = '';
        let saveTo = '';
        let fileSaved = false;

        busboy.on('field', (fieldname, val) => {
            if (fieldname === 'filename') filename = val;
            if (fieldname === 'path') folderPath = val;
        });

        busboy.on('file', (fieldname, file, fileInfo) => {
            // If client sent filename as POST variable, use that; otherwise use fileInfo.filename

            filename = filename.replaceAll(' ', '-');

            let actualFilename = filename || fileInfo.filename || `img_${Date.now()}.jpg`;



            const uploadDir = global.__app_path + folderPath;

            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

            saveTo = path.join(uploadDir, actualFilename);

            const writeStream = fs.createWriteStream(saveTo);
            file.pipe(writeStream);
            file.on('end', () => { fileSaved = true; });
        });

        busboy.on('finish', () => {
            if (fileSaved) {
                res.send(JSON.stringify({
                    success: true,
                    filePath: folderPath + (filename || ''),

                }));
            } else {
                res.status(500).send(JSON.stringify({
                    success: false,
                    message: 'File not written'
                }));
            }
        });

        req.pipe(busboy);
    }

    static getDirContents(request, context) {
        const fs = require('fs');

        const path = global.__app_path + request.filePath;

        const entries = fs.readdirSync(path, { withFileTypes: true });

        const folders = [];
        const files = [];

        entries.forEach(entry => {

            if (entry.isDirectory()) {
                folders.push(entry.name);
            } else if (entry.isFile()) {
                files.push(entry.name);
            }

        });

        context.res.send(JSON.stringify({ files, folders }));

    }

    static createDir(request, context) {
        const fs = require('fs');

        const path = global.__app_path + request.folderPath;

        try {

            fs.mkdirSync(path, { recursive: true });
            context.res.send(`Directory created at: ${path}`);

        } catch (err) {

            context.res.send(`Error creating directory at ${path}:`, err.message);


        }
    }

    static renameFileFolder(request, context) {
        const fs = require('fs');
        const oldPath = global.__app_path + request.oldPath;
        const newPath = global.__app_path + request.newPath;

        try {
            fs.renameSync(oldPath, newPath);
            context.res.send(`Renamed '${oldPath}' to '${newPath}'`);
        } catch (err) {
            context.res.send(`Error renaming '${oldPath}' to '${newPath}':` + err.message);
        }
    }



    static async ajax(request, context) {

        addAjax('create_post', async (context, request) => {

            const newPost = await createPost({
                title: '',
                slug: '',
                author: 0,
                content: '',
                post_type: request.post_type,
                slug: '',
                post_status: 'new'
            })

            context.res.send(newPost.id);

        })

        addAjax('add_cpt', async (context, request) => {
            NPAdmin.addCPT(request, context);
        })

    }


}

module.exports = NPAdmin;
