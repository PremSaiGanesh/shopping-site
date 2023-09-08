function createUserSession(req,user,action) {
    req.session.uid = user._id.toString();
    req.session.save(action);
}

//export authutil functions
module.exports = {
    createUserSession: createUserSession
};