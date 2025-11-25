const {DataTypes} = require('sequelize');

const Menu = global.npdb.define('np_options', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  key: DataTypes.STRING,
  value: DataTypes.STRING,
});

module.exports = Menu;

(async ()=> {
    await global.npdb.sync();
})()