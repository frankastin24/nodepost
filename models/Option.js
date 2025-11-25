const {DataTypes} = require('sequelize');

const Option = global.npdb.define('np_options', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  key: DataTypes.STRING,
  value: DataTypes.STRING,
});

module.exports = Option;

(async ()=> {
    await global.npdb.sync();
})()