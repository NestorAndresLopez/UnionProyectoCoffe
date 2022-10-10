import {Router} from 'express';
import * as Controllers from './controller.js';
import * as authController from '../users/controller.js';

const router = new Router();

//ALL CLIENTS 
router.get('/clients', authController.isAuthenticated,  Controllers.GetClients);

//RENDER ADD CLIENTS VIEW
router.get('/addclients', authController.isAuthenticated, (req, res) =>{
    res.render('clients/add');
} ); 

// NEW CLIENTS
router.post('/addclients', authController.isAuthenticated, Controllers.CreateClients);

//DELETE CLIENTS
router.get('/deleteclients/:id', authController.isAuthenticated, Controllers.DeleteClients);

//RENDER EDIT CLIENTS VIEW

router.get('/editclients/:id', authController.isAuthenticated, Controllers.UpdateClientsView);

//EDIT CLIENTS 
router.post('/editclients/:id', authController.isAuthenticated, Controllers.UpdadateClients);

export default router;