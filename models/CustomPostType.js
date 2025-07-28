const {DataTypes} = require('sequelize');
module.exports = global.npdb.define('np_custom_post_types', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  title: DataTypes.STRING,
  slug: DataTypes.STRING,
  archiveRewrite: DataTypes.STRING,
  postRewrite: DataTypes.STRING,
  useBasicEditor: DataTypes.BOOLEAN,
  useAdvancedEditor: DataTypes.BOOLEAN,
  useRest: DataTypes.BOOLEAN,
  menuName: DataTypes.STRING,
});

(async ()=> {
    await global.npdb.sync();
})()