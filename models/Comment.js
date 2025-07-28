

const {DataTypes} = require('sequelize');
module.exports = global.npdb.define('np_comments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  postID: DataTypes.INTEGER,
  commentID: DataTypes.INTEGER,
  author: DataTypes.INTEGER,
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  userName:DataTypes.STRING,
  userEmail:DataTypes.STRING
});

(async ()=> {
    await global.npdb.sync();
})()
