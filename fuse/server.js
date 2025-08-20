const express = require('express');
const router = require('./routing');
const path = require('path');
const fs = require('fs')
const app = express();
const port = 80;
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    // Construct an absolute path based on the request URL
    const requestedPath = path.join(global.__app_path, req.path);

    // Security: Prevent access outside the base directory
    if (!requestedPath.startsWith(global.__app_path)) {
        return res.status(403).send('Forbidden');
    }

    fs.stat(requestedPath, (err, stats) => {
        if (!err && stats.isFile()) {
            // File exists, serve it
            res.sendFile(requestedPath);
        } else {
            // Not a file or doesn't exist, continue to other middleware/routes
            next();
        }
    });
});

app.all('/{*any}', (req, res) => {
    global.__express_res = res;
    global.__express_req = req;
    router.execute(req, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost`);
});