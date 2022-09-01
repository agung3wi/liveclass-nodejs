const AuthMiddleware = {
    redirect: function(req, res, next) {
        if(!req.session.user)
            return res.redirect("/login")
        next()
    },
    forbidden: function(req, res, next) {
        // rest api
        next()
    }      
}
module.exports  = AuthMiddleware

