exports.modules.setRequestGlobal = (req) => {
    global.request = {};
    global.request.url = url;
    global.request.path = req.path;
    global.request.pathSections = request.path.split('/');
}