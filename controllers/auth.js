const { response } = require("express");
const bcrypjs = require('bcryptjs');

const User = require('../models/usuario');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //? Verificar si el correo existe
        const user = await User.findOne({email});
        if ( !user ) {
            return res.status(400).json({
                msg: 'El Usuario / Password no son correctos - email'
            });
        }

        //? Si el usuario esta activo
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'El Usuario / Password no son correctos - status:false'
            });
        }

        //? Verificar la contraseña
        const validPassword = bcrypjs.compareSync( password, user.password );
        if ( !validPassword ){
            return res.status(400).json({
                msg: 'El Usuario / Password no son correctos - password'
            });
        }

        //? generar el JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });

     }catch(error) {
        console.log("login error:", error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
        
     }

}

module.exports = {
    login
}