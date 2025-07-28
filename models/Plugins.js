const {DataTypes} = require('sequelize');

module.exports = global.npdb.define('np_user_meta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  folder: DataTypes.STRING,
  active: DataTypes.BOOLEAN,
});

(async ()=> {
    await global.npdb.sync();
})();