const req = require("express/lib/request");

function authMiddle(req,res,next){
    if (req.session.usuarioLogueado){
      
        return next() }
 
    return res.redirect("/busers/login")
    }
module.exports = authMiddle