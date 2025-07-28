const {DataTypes} = require('sequelize');
module.exports = global.npdb.define('np_options', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  key: DataTypes.STRING,
  value: DataTypes.STRING,
});

(async ()=> {
    await global.npdb.sync();
})()