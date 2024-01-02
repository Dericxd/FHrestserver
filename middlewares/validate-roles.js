const { response } = require('express');

const isAdminRol = ( req, res = response, next ) => {

    console.log('user/req:',req.user)
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

module.exports = {
    isAdminRol
}