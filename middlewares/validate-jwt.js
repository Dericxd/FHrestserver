const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/usuario');

const validateJWT = async( req, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    
    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        //? Leer el usuario que correspone al uid
        const user = await User.findById(uid);

        //! Verificar si el usuario no existe
        if ( !user ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
        }

        //* Verificar si el uid tiene estado en true
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estatus: false'
            });
        }
        
        req.user = user;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

}

module.exports = {
    validateJWT
}