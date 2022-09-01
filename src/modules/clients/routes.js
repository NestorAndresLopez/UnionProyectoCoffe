import {Router} from 'express';
import * as Controllers from './controller.js';

const router = new Router();

//ALL CLIENTS 
router.get('/clients', Controllers.GetClients);

//RENDER ADD CLIENTS VIEW
router.get('/addclients', (req, res) =>{
    res.render('clients/add');
} );

// NEW CLIENTS
router.post('/addclients',  Controllers.CreateClients);

//DELETE CLIENTS
router.get('/deleteclients/:id', Controllers.DeleteClients);

//RENDER EDIT CLIENTS VIEW

router.get('/editclients/:id', Controllers.UpdateClientsView);

//EDIT CLIENTS 
router.post('/editclients/:id', Controllers.UpdadateClients);

export default router;