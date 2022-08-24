import {Router} from 'express';

const router = new Router();

router.get('/', (req, res) =>{
    res.send('Aqui va el Kardex');
} );




export default router;