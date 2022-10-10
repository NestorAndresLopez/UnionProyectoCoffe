import {Router} from 'express';
const router = new Router();

import * as authController from './controller.js';

//router para las vistas
router.get('/', authController.isAuthenticated, (req, res) =>{
    res.render('users/index')
})

router.get('/login', (req, res) =>{
    res.render('users/login')
})

router.get('/register', (req, res) =>{
    res.render('users/register')
})  


//router para los metodos del controller

router.post('/register', authController.register)
router.post('/login', authController.login, authController.getUser, authController.createSessionToken, authController.setCookie)
router.get('/logout', authController.logout);

export default router;