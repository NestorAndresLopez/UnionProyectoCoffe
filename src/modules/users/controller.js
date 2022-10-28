import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import {connection} from '../../utils/database.js';
import {promisify} from 'util';
import {v4 as uuidv4} from 'uuid';
import { verify } from 'crypto';

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


export const UserPass = async(req, res, next) =>{
        const user = req.body.user
        const pass = req.body.pass
        if(!user || !pass){
            res.render('users/login')
        }else{
            return next()
        }
}


export const VerifyUserPass = async(req, res, next) =>{
        const user = req.body.user
        const pass = req.body.pass

        connection.query('SELECT * FROM users WHERE user = ?' , [user], async (error, results) =>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                res.render('users/login')            
            }else{
                return next()
            }
        } )
}


export const CreateToken = async(req, res, next) =>{
    const user = req.body.user

        connection.query('SELECT * FROM users WHERE user = ?' , [user], async (error, results) =>{
            if(results.length == 0 ){
                res.render('users/login') 
                                 
            }else{
                const id = results[0].id 
                const token = jwt.sign({id}, process.env.KEY_SECRET)  
            
            //token sin fecha de expiracion
    
            console.log("TOKEN: " + token+" para el USUARIO: " +user)

            // const cookiesOptions ={
            //     expires: new Date(Date.now()+90 * 24 * 60 * 60 * 1000),
            //     httpOnly: true
            // }
            // res.cookie('jwt', token)
            // res.render('users/index')
            
            return req.token = token, next();   
            }
        } )
}


export const CreateKokies = async(req, res) =>{
    const token = req.token
    const cookiesOptions ={
        expires: new Date(Date.now()+90 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.cookie('jwt', token);
    res.redirect('/');

}


export const isAuthenticated = async(req, res, next) => {
    if(req.cookies.jwt){
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.KEY_SECRET)
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