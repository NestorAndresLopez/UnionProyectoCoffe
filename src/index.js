import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';
import cookieParser from 'cookie-parser';
import {connection} from './utils/database.js';
import { fileURLToPath } from 'url';

import usersRoutes from './modules/users/router.js';
import clientsRoutes from './modules/clients/routes.js';

//Initializations 

const app = express();


//Cookies
app.use(cookieParser())

//Settings

app.set('port', process.env.PORT || 4000 );
connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }    
    console.log('DB connected as id ' + connection.threadId);
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    runtimeOptions:{
        allowProtoPropertiesByDefault:true,
        allowProtoMethodsByDefault:true,
    },
    layoutsDir: path.join(app.get('views'), 'layouts') ,
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine','hbs');

//Middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 

//Global Variables

app.use((req, res, next) =>{
    app.locals.cookies = req.cookies;
    next();
})

//Routes
app.use(usersRoutes);
app.use(clientsRoutes);


//Public 

app.use(express.static(path.join(__dirname, 'public')));


//Environment Variables
dotenv.config({ path: './src/env/.env'})

//para eliminar cache y no poder volver a la pagina anterior
// app.use(function(req, res, next){
//     if(!req.user)
//     res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//     next();
// });

//Listen Server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});