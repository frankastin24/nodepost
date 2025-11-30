
const createUser = require('./createUser');

module.exports = async (user) => {
    
    user.role = 'admin';
    
    return await createUser(user);

}