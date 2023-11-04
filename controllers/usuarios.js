const { response } = require('express');
const bcrypt = require('bcryptjs');
const User =  require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    // const query = req.query;
    const { q, nombre = 'no hay nombre', apikey, page, limit } = req.query;

    res.json({
        msg: 'get API - usuariosGet',
        q,
        nombre,
        apikey,
        page,
        limit
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
    const { password, google, email, ...rest } = req.body;

    //TODO validar contra DB
    if ( password ) {
        //? encriptar la clave
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );
    
    res.status(400).json({
        msg: 'put API - usuariosPut',
        user
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}