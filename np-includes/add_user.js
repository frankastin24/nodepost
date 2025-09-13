const User = require('../models/User')

module.exports = (user) => {
   
    const newUser = User.build({
          email: '',
          username: user.username,
          password: user.password,
          firstName: '',
          lastName: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          county: '',
          country: '',
          postcode: '',
          phone: '',
          role: user.role,
   })
   
   newUser.save();
}