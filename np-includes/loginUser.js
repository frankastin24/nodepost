const checkCreds = require('./checkCreds');

module.exports = (context,username,password) => {

    const credcheck = checkCreds(username,password);

    if(!credcheck.error) {
        
        context.req.session.userID = credcheck.user.id;

        return {
            error: false
        }

    } else {
        
        return credcheck;
    
    }

}