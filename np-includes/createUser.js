
const argon2 = require('argon2');
const User = require('../models/User');
module.exports = async (user) => {

    const hashedPassword = await hashPassword(user.password);
    
    const newUser = await User.build({
        username : user.username,
        password :hashedPassword,
        email : (user.email ? user.email : '') ,
        firstName : (user.firstName ? user.firstName : '') ,
        lastName : (user.lastName ? user.lastName : '') ,
        role : (user.role ? user.role : '') ,
    })

    await newUser.save();

    return newUser;

}

async function hashPassword(plainPassword) {
  // Tune these for your hardware. See OWASP for minimum guidance.
  const options = {
    type: argon2.argon2id,   // Argon2id recommended
    timeCost: 2,             // iterations (increase as you benchmark)
    memoryCost: 19 * 1024,   // 19 MiB expressed in KiB (OWASP minimum); tune upward
    parallelism: 1,
    // saltLength: 16,       // lib generates a random salt automatically
  };

  return await argon2.hash(plainPassword, options); // returns encoded hash string
}
