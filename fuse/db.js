const { Sequelize } = require('sequelize');
const doAction = require('../np-includes/doAction');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../postnode.sqlite' // <-- your file path here
});

(async () => {
     
    await sequelize.authenticate()

    global.npdb = sequelize;

    doAction('db_initalized');

})
