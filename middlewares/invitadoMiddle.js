const req = require("express/lib/request");

function invitadoMiddle(req,res,next){
    console.log("está en invitado")
    if (req.session.usuarioLogueado){
        let user = req.session.usuarioLogueado.name
        return user }
 
    return next()
    }
module.exports = invitadoMiddle;

