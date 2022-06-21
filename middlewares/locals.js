function locals(req, res, next){
   
    res.locals.userLocals = false;

    if(req.session.usuarioLogueado){
        res.locals.userLocals = req.session.usuarioLogueado;
        let user= req.session.usuarioLogueado.name;
        
    }

    next()
}

module.exports = locals