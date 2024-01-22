const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { login, googleSignIn } = require('../controllers/auth');

const  router = Router();

router.post('/login',[
    check('email', 'EL correo o email es obligatorio').isEmail(),
    check('password').isLength({ min: 6 }).withMessage('EL password es obligatorio y con mas de 6 letras').notEmpty(),
    validateFields
], login)

router.post('/google',[
    check('id_token', 'id_token es necesario').notEmpty(),
    validateFields
], googleSignIn)

module.exports = router;