const express = require('express');
const app = express();
const port = 80;
const displayHome = require('./np-includes/displayHome') 
const doAdmin = require('./np-includes/doAdmin')
const {checkRewrite} = require('./np-includes/rewrite')
const setRequestGlobal = require('./np-includes/setRequestGlobal')

function isHome(req) {
  // req.path gives the route path, e.g. "/about", "/"
  return req.path === "/" || req.path === "";
}

//Load plugins


app.get('/{*any}', (req, res) => {
    
    const url = req.originalUrl; 

    //Set request global

    setRequestGlobal(req);

    //Set express response global

    global.express_res = res;

    //Check if url is rewrite

    const redirect = checkIfURLIsRewrite();

    if(redirect) {
      res.redirect(redirect);
    }

    //Check if url is admin

    if(global.request.pathSections[0] == 'np-admin') {
        return doAdmin();
    }
    
    //Check if installation complete

    if(global.__env.INSTALL_COMPLETE == 'false') {
      
      //Redirect to install page

       return res.redirect('/np-admin/install');

    }

    //Check if url is home

    if(isHome(req)) {
        return displayHome();
    }
    
    

    res.send('<h1>Home Page or 404 Page</h1>');
  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost`);
});