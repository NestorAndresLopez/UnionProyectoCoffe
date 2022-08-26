import {Router} from 'express';
import * as Controllers from './controller.js';

const router = new Router();

router.get('/clients', Controllers.GetClients);

router.get('/addclients', (req, res) =>{
    res.render('clients/add');
} );

router.post('/addclients', async(req, res) =>{
    const newObjet = {
        id: uuidv4(),
        nit: req.body.nit,
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    };
    await connection.query('INSERT INTO clients set ?', [newObjet]);
    res.redirect('/clients');
} );

router.get('/deleteclients/:id', async(req, res)=>{
    const {id} = req.params;
    await connection.query('DELETE FROM clients WHERE ID = ?',[id] );
    res.redirect('/clients');
} )

router.get('/editclients/:id', async(req,res)=>{
    const {id} = req.params;
    const clients = await connection.query('SELECT * FROM clients WHERE id = ?',[id] );
    res.render('clients/edit',{clients:clients[0]});
})

router.post('/editclients/:id', async(req, res)=>{
    const {id} = req.params;
    const{nit, name, city, address, phoneNumber, email} = req.body;
    const editObject = {
        nit,
        name,
        city,
        address,
        phoneNumber,
        email
    };
    await connection.query('UPDATE clients set ? WHERE id = ?', [editObject, id]);
    res.redirect('/clients');
})


export default router;