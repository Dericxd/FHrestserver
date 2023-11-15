const { response } = require('express');
const bcrypt = require('bcryptjs');
const User =  require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    // const query = req.query;
    // const { q, nombre = 'no hay nombre', apikey, page, limit } = req.query;
    const {limit = 3, desde = 0 } = req.query;
    const query = {status: true}
    /* const users = await User.find(query)
        .skip(Number(desde))
        .limit(Number(limit));

    const total = await User.countDocuments(query); */

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ]);;

    res.json({
        total,
        users
    });
}

const usuariosPost = async (req, res = response) => {


    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });
    // const { nombre, edad } = req.body;

    //? encriptar la clave
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //* Guarda en DB
    await user.save();

    res.status(201).json({
        // msg: 'post API - usuariosPost',
        // nombre,
        // edad
        user
    });
}

const usuariosPut = async(req, res = response) => {

    // const id = req.params.id
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    //TODO validar contra DB
    if ( password ) {
        //? encriptar la clave
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest);
    
    res.status(200).json(user);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    })
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    //? Fisicamente lo borramos
    //const user = await User.findByIdAndDelete( id );
    
    const user = await User.findByIdAndUpdate( id, {status: false} );
    res.json({        
        user,
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}