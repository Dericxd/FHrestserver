const { Router } = require('express');
const { check } = require('express-validator');

/* const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRol, hasRol } = require('../middlewares/validate-roles'); */
const {
    validateFields,
    validateJWT,
    isAdminRol,
    hasRol
} = require('../middlewares')

const { isValidateRol, isExistsEmail, isExistsUserForId } = require('../helpers/db-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

//  * se agrega los dos puntos para que sea dinamico y se le agrega el nombre
router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( isExistsUserForId ),
    check('rol').custom( isValidateRol ),
    validateFields
],usuariosPut);

router.post('/', [
    check('name').notEmpty().withMessage('EL nombre es obligatorio'),
    check('password').isLength({ min: 6 }).withMessage('EL password es obligatorio y con mas de 6 letras'),
    // check('email').isEmail(),
    check('email').isEmail().custom( isExistsEmail ),
    //check('rol').isIn(['ADMIN_ROLE','USER_ROLE']).withMessage('No es un rol valido'), // Para guiarnos al ser una lista
    check('rol').custom( isValidateRol ),
    validateFields
],usuariosPost);

router.delete('/:id', [
    validateJWT,
    //isAdminRol,
    hasRol('ADMIN_ROLE','SALE_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( isExistsUserForId ),
    validateFields
],usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;