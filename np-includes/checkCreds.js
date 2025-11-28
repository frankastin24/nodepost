const User = require('../models/User');

module.exports = (username, password) => {
    const Users = User.findAll({
        where: {
            username: username
        }
    })

    if (Users.length > 0) {

        const hashed = crypto.createHash('md5').update(password).digest("hex");

        if (Users[0].password == hashed) {



            return {

                user: Users[0],
                error: false,

            }

        } else {
            return {
                error: true,
                message: 'Password incorrect'

            }
        }

    } else {
        return {
            error: true,
            message: 'User not found'

        }
    }
}