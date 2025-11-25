class NPLoad {
    static init(request,context) {

        if(global.__env.INSTALL_COMPLETE = 'false') {
            context.res.redirect(`/${global.__env.ADMIN_URL}/install`);
        }

    }
}

module.exports = NPLoad;