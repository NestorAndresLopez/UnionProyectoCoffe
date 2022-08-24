import mysql from 'mysql';
import {promisify} from 'util';

export const connection = mysql.createConnection({
    host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'uproyectocafe'
});

connection.query = promisify(connection.query);


