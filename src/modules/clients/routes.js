import {Router} from 'express';
import {connection} from '../../utils/database.js';
const router = new Router();

router.get('/clients', async(req, res)=>{
    const clients = await connection.query('SELECT * FROM clients');
    res.render('clients/list', {clients});
} )

router.get('/addclients', (req, res) =>{
    res.render('clients/add');
} );

router.post('/addclients', async(req, res) =>{
    const {nit, name, city, address, phoneNumber, email} = req.body;
    const newClient = {
        nit,
        name, 
        city,
        address,
        phoneNumber,
        email
    };
    await connection.query('INSERT INTO clients set ?', [newClient]);
    res.redirect('/clients');
} );






export default router;