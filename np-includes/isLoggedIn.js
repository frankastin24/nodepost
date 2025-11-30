module.exports = (context) => {
    console.log(typeof context.req.session.userID);
    return typeof context.req.session.userID != 'undefined'; 
}