class NPLoad {
    static init() {

        if(global.__env.INSTALL_COMPLETE = 'false') {
            global.__express_res.redirect(`/${global.__env.ADMIN_URL}/install`);
        }

    }
}

module.exports = NPLoad;