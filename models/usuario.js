
const { Schema, model }= require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true,'el correo electronico es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'la contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol:{
        type: String,
        required: true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports =  model('User',UserSchema);