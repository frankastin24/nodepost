const express = require('express');
const router = require('./routing');

const app = express();
const port = 80;

app.all('/{*any}', (req, res) => {
    global.__express_res = res;
    global.__express_req = req;
    router.execute(req, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost`);
});