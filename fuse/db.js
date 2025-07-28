const { Sequelize } = require('sequelize');
const doAction = require('../np-includes/doAction');



const initializeDB = async () => {
  
  if(global.__env.FORCE_MYSQL == 'true' ||  global.__env.MODE == 'production') {
  
    const sequelize = new Sequelize({
     dialect: 'mysql',
     host: global.__env.DB_HOSTNAME,
     username: global.__env.DB_USERNAME,
     password: global.__env.DB_PASSWORD,
    });

  } else {

    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: '../postnode.sqlite' // <-- your file path here
    });

  }
   
  await sequelize.authenticate()

  global.npdb = sequelize;

  doAction('db_initalized');

}

module.exports = initializeDB;

