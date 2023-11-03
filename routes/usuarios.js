const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role')

const { validateFields } = require('../middlewares/validate-fields');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

//  * se agrega los dos puntos para que sea dinamico y se le agrega el nombre
router.put('/:id', usuariosPut);

router.post('/', [
    check('name').notEmpty().withMessage('EL nombre es obligatorio'),
    check('password').isLength({ min: 6 }).withMessage('EL password es obligatorio y con mas de 6 letras'),
    check('email', 'EL correo no es valido').isEmail(),
    //check('rol').isIn(['ADMIN_ROLE','USER_ROLE']).withMessage('No es un rol valido'), // Para guiarnos al ser una lista
    check('rol').custom( async(rol = '') => {
        const existsRol = await Role.findOne({ rol });
        if ( !existsRol ) {
            throw new Error(`El rol ${ rol } no esta registrado en la DB`);
        }
    }),
    validateFields
],usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;