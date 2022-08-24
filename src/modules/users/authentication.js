import {Router} from 'express';

const router = new Router();

router.get('/signup', (req, res) =>{
    res.send('Rutas de autenticacion');
} );




export default router;