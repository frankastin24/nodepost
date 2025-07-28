const {DataTypes} = require('sequelize');

module.exports = global.npdb.define('np_user_meta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  userId: DataTypes.INTEGER,
  key: DataTypes.STRING,
  value: DataTypes.STRING,
});

(async ()=> {
    await global.npdb.sync();
})()