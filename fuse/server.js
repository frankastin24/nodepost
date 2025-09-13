const express = require('express');
const router = require('./routing');
const session = require('express-session');
const contextMiddleware = require('./context')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const port = 80;



app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key',            // Change this to a strong secret for your app
  resave: false,                        // Don't save session if unmodified
  saveUninitialized: false,             // Don't create session until something stored
  cookie: { secure: false } ,
  store: new SequelizeStore({
    db: global.npdb,
  }),            // Set to true if using HTTPS
}));

app.use(contextMiddleware);

app.all('/{*any}', (req, res) => {
     

    //router.execute(req.context);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost`);
});