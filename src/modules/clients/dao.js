import {connection} from '../../utils/database.js';

// export const GetClientsDao = async(clients) =>{
//     return clients = await connection.query('SELECT * FROM clients');
    
// }

export const GetClientsDao = async(callback) => {
    const sql = `SELECT * FROM clients`;
    await connection.query(sql, (err, resp) => {
        if(err) callback(error);
        callback(null, resp)
    });
}