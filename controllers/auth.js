const { response } = require("express");
const bcrypjs = require('bcryptjs');

const User = require('../models/usuario');

const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async( req, res = response ) => {

    const { id_token } = req.body;

    try {

        const { name, email, img } = await googleVerify( id_token );

        let user = await User.findOne( { email })

        if ( !user ) {
            //* Tengo que crearlo
            const data = {
                name,
                email,
                password: "123456789",  //? temporal para poder ingresar
                img,
                google: true
            };

            user = new User( data );
            await user.save();
        }

        //! Si el usuario en DB
        if ( !user.status ) {
            return res.status(401).json({
                msg: "Usuario no autorizado o bloquedo, hable con el administrador"
            });
        }

        const token = await generateJWT( usuario.id );
                
        res.json({
            user,
            token,
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token de google no se pudo verificar '
        });
    }

}

module.exports = {
    login,
    googleSignIn
}