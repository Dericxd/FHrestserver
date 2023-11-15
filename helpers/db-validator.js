const Role = require('../models/role');
const User =  require('../models/usuario');

const isValidateRol = async (rol = '') => {
    const existsRol = await Role.findOne({ rol });
    if (!existsRol) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`);
    }
}

const isExistsEmail = async (email = '') => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`El correo '${email}', ya esta registrado`)
    }
}

const isExistsUserForId = async (id) => {
    const existsUser = await User.findById(id);
    if ( !existsUser) {
        throw new Error(`El id no existe '${id}'`)
    }
}

module.exports = {
    isValidateRol,
    isExistsEmail,
    isExistsUserForId
}