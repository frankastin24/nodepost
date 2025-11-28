const {DataTypes} = require('sequelize');

const Post = global.npdb.define('np_posts', {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },

  author: DataTypes.INTEGER,
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  post_type : DataTypes.STRING,
  slug : DataTypes.STRING,
  post_status : DataTypes.STRING

});

module.exports = Post;

(async ()=> {
    await global.npdb.sync();
})()
