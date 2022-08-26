import * as Dao from './dao.js';

export const GetClients = (req, res)=>{
    Dao.GetClientsDao((error, resp)=>{
        if(error) throw error
        if(resp.length > 0){
            res.render('clients/list', {resp});
        }
    })

    
}
