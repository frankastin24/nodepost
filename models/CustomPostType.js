const {DataTypes} = require('sequelize');

const CustomPostType = global.npdb.define('np_custom_post_types', {
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

let Pages = CustomPostType.findAll({
  where : {
    slug : 'pages'
  }
})

if(Pages.length == 0) {

 Pages = CustomPostType.build({

    title: 'Pages',
    slug: 'pages',
    archiveRewrite : '/',
    postRewrite: '/',
    useBasicEditor:true,
    usePageBuilder: true,
    useRest:false,
    menuName:'Pages'

})

 Pages.save();
}

module.exports = CustomPostType;

(async ()=> {
    await global.npdb.sync();
})()