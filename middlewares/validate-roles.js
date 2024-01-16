const { response } = require('express');

const isAdminRol = ( req, res = response, next ) => {

    //console.log('user/req:',req.user)
    if ( !req.user ){
        return res.status(500).json({
            msg: `Se quiere verificar el role sin validar el token primero ${req.user}`
        });
    }
    
    const { rol, name } = req.user;

    if ( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ name } no es administrador - puede hacer esto`
        });
    }

    next();

}

const hasRol = ( ...roles ) => {
    
    return (req, res = response, next) => {
        
        if ( !req.user ){
            return res.status(500).json({
                msg: `Se quiere verificar el role sin validar el token primero ${req.user}`
            });
        }

        if ( !roles.includes(req.user.rol) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    }

}

module.exports = {
    isAdminRol,
    hasRol
}