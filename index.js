const express = require('express');
const app = express();
const port = 80;
const displayHome = require('./np-includes/displayHome') 
const doAdmin = require('./np-includes/doAdmin')
const {checkRewrite} = require('./np-includes/rewrite')

function isDomainOnly(req) {
  // req.path gives the route path, e.g. "/about", "/"
  return req.path === "/" || req.path === "";
}

//Load plugins


app.get('/{*any}', (req, res) => {
    
    const url = req.originalUrl; 
    global.request = {};
    global.request.url = url;
    global.request.path = req.path;
    global.request.pathSections = request.path.split('/');
    global.express_res = res;

    //Check if url is home

    if(isDomainOnly(req)) {
        return displayHome();
    }
    
    //Check if url is admin

    const pathSections = req.path.split('/');

    if(pathSections[0] == 'np-admin') {
        return doAdmin();
    }

    //Check if url is rewrite


    res.send('<h1>Home Page or 404 Page</h1>');
  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost`);
});