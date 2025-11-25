const User = require('../models/User')
const crypto = require('crypto')

module.exports = async (user,session) => {

    const foundUsers = await User.findAll({
        where: {
            username: user.username
        }
    })

    if(foundUsers.length == 0) {
        return {
            error : true,
            message : 'user'
        }
    }

    const hashedPassword = crypto.createHash('md5').update(user.password).digest("hex")
    

    if(foundUsers[0].password !== hashedPassword) {
        return {
            error : true,
            message : 'password'
        }
    }

    session.user = foundUsers[0];
    session.loggedIn = true;
    session.isAdmin = foundUsers[0].role == 'admin';
    return {
        error:false
    }

}