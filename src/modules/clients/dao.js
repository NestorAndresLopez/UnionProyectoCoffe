import {connection} from '../../utils/database.js';

export const GetClientsDao = async(callback) => {
    const sql = `SELECT * FROM clients`;
    await connection.query(sql, (error, resp) => {
        if(error) callback(error);
        callback(null, resp)
    });
}

export const CreateClientsDao = async(payload, callback) => {
    const sql = 'INSERT INTO clients SET?';
    await connection.query(sql, payload, (error,resp) => {
        if(error) callback(error);
        callback(null, resp)
    });
}

export const DeleteClientsDao = async(id, callback) =>{
    const sql = `DELETE FROM clients WHERE id = '${id}'`;
    await connection.query(sql,(error,resp) =>{
        if(error) callback(error);
        callback(null, resp);
    })
}

export const UpdateClientsViewDao = async(id, callback) =>{
    const sql = `SELECT * FROM clients WHERE id = '${id}'`;
    await connection.query(sql,(error, resp) =>{
        if(error) callback(error);
        callback(null, resp);
    })
}

export const UpdateClientsDao = async( payload, id, callback) =>{
    const sql = `UPDATE clients SET? WHERE id = '${id}'`;
    await connection.query(sql, payload,(err, resp) =>{
        if(err) callback(err);
        callback(null, resp);
    })
}
