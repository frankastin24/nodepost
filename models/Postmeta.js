const {DataTypes} = require('sequelize');
module.exports = global.npdb.define('np_post_meta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  postId: DataTypes.INTEGER,
  key: DataTypes.STRING,
  value: DataTypes.STRING,
});

(async ()=> {
    await global.npdb.sync();
})()