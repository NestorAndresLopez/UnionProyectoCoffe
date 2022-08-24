import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path  from 'path';
import {connection} from './utils/database.js';
import { fileURLToPath } from 'url';

import navRoutes from './modules/nav/index.js';
import usersRoutes from './modules/users/authentication.js';
import clientsRoutes from './modules/clients/routes.js';

//Initializations

const app = express();

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

    next();
})

//Routes
app.use(navRoutes);
app.use(usersRoutes);
app.use(clientsRoutes);


//Public

app.use(express.static(path.join(__dirname, 'public')));


//Listen Server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});