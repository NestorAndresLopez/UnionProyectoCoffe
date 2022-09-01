import {v4 as uuidv4} from 'uuid';
import { connection } from '../../utils/database.js';
import * as Dao from './dao.js';

export const GetClients = (req, res)=>{
    Dao.GetClientsDao((error, resp)=>{
        if(error) throw error
        if(resp.length > 0){
            res.render('clients/list', {resp});
        }
    }) 
}

export const CreateClients = (req, res) => {
    const clientsObj ={
        id: uuidv4(),
        nit: req.body.nit,
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    }
    Dao.CreateClientsDao(clientsObj, (error, resp) => {
        if(error) throw error;
        res.redirect('/clients');
    }) 
}

export const DeleteClients =(req, res)=>{
    const {id} = req.params;
        Dao.DeleteClientsDao(id, (error, resp)=>{
            if(error) throw error;
            res.redirect('/clients');
        })
}

export const UpdateClientsView = (req, res) =>{
    const {id} = req.params;
        Dao.UpdateClientsViewDao(id, (error, resp)=>{
            if(error) throw error;
            res.render('clients/edit', {clients: resp[0]});
        })
}

export const UpdadateClients = (req, res) =>{
    const {id} = req.params;
    const {nit, name, city, address, phoneNumber, email } = req.body;
    const newClientsObj= {
        nit,
        name,
        city,
        address,
        phoneNumber,
        email
        
    }
    Dao.UpdateClientsDao(newClientsObj, id,  (error, resp) =>{
        if(error) throw error;
        res.redirect('/clients');
    } )
}
