import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import {connection} from '../../utils/database.js';
import {promisify} from 'util';
import {v4 as uuidv4} from 'uuid';


//procedimiento para registrarnos

export const register = async(req, res)=>{
try {  
    const id = uuidv4()
    const name = req.body.name
    const user = req.body.user
    const pass = req.body.pass
    let passHash = await bcryptjs.hash(pass, 8)

    connection.query('INSERT INTO users SET ?', {id:id, user:user, name:name, pass:passHash}, (error, results)=>{
        if(error){console.log(error)}
        res.redirect('/login')
    })
} catch (error) {
    console.log(error)
}
}


export const getUser = async(req, res) =>{
    console.log("recuperando usuario");
}


export const createSessionToken = async(req, res) =>{
    console.log("creando token");
}


export const setCookie = async(req, res) =>{
    console.log("configurando cookies");
}

export const login = async(req, res) =>{

    try {
        const user = req.body.user
        const pass = req.body.pass

        if(!user || !pass){
            res.render('users/login')
            return
        }

        connection.query('SELECT * FROM users WHERE user = ?' , [user], async (error, results) =>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                res.render('users/login')
            
            }else{
                //inicio de secion ok
                const id = results[0].id 
                const token = jwt.sign({id}, process.env.KEY_SECRET)  
                        
                //token sin fecha de expiracion
                // const token = jwt.sing({id:id}, process.env.JWT_SECRETO)
                
                console.log("TOKEN: " + token+" para el USUARIO: " +user)

                const cookiesOptions ={
                    expires: new Date(Date.now()+90 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt', token)
                res.render('users/index')

            }
        } )

    } catch (error) {
        console.log(error)
    }
}

export const isAuthenticated = async(req, res, next) => {
    
    if(req.cookies.jwt){
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, 'keysecret')
            connection.query('SELECT users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user= results[0]
                return next()
            })
        } catch (error) {
        console.log(error)
        return next()            
        }
    }else{
        res.redirect('/login')
    }
}


export const logout = (req,res) =>{
    res.clearCookie('jwt')
    return res.redirect('/login')
}