const { response } = require('express');
const User =  require('../models/usuario');

const usuariosGet = (req = request, res = response) => {

    // const query = req.query;
    const {q, nombre = 'no hay nombre', apikey, page, limit } = req.query;

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

    const body = req.body;
    const user = new User(body);
    // const { nombre, edad } = req.body;

    await user.save();

    res.status(201).json({
        // msg: 'post API - usuariosPost',
        // nombre,
        // edad
        user
    });
}

const usuariosPut = (req, res = response) => {

    // const id = req.params.id
    const {id} = req.params
    res.status(400).json({
        msg: 'put API - usuariosPut',
        id
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