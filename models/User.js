const {DataTypes} = require('sequelize');

module.exports = global.npdb.define('np_users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  email: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  addressLine1: DataTypes.STRING,
  addressLine2: DataTypes.STRING,
  city: DataTypes.STRING,
  county: DataTypes.STRING,
  country: DataTypes.STRING,
  postcode: DataTypes.STRING,
  phone: DataTypes.STRING,
  is_public: DataTypes.BOOLEAN

});
(async ()=> {
    await global.npdb.sync();
})()
    