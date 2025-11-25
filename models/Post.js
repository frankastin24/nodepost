const {DataTypes} = require('sequelize');
module.exports = global.npdb.define('np_posts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  author: DataTypes.INTEGER,
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
});

(async ()=> {
    await global.npdb.sync();
})()
