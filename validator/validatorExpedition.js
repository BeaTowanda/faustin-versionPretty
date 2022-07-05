const bcrypt = require("bcryptjs/dist/bcrypt");
const { check, body } = require("express-validator")
const fs = require("fs");
const path = require("path");


const db = require('../src/database/models');
const sequelize = db.sequelize;

const validatorEXP = {
    altaDeposito:[
        check ("name")
        .notEmpty()
        .withMessage("Debe ingresar NOMBRE")
        .bail()
        .custom(function(value){              
            return db.Deposit.findOne({
                where:{
                    name :value
                } 
             }) 
             .then (deposit =>{
                 if(deposit){
                     return Promise.reject("Este Depósito YA EXISTE")
                 }
             })        
         } ),
         check("oncharge")
            .notEmpty()
            .withMessage("Debe Ingersar Responsable"), 
        check("direction")
            .notEmpty()
            .withMessage("Debe Ingresar Dirección"),
        check("horary")
            .notEmpty()
            .withMessage("Debe Ingresar Horario")  
    ],
    altaProveedor:[
        check ("name")
        .notEmpty()
        .withMessage("Debe ingresar NOMBRE")
        .bail()
        .custom(function(value){              
            return db.Supplier.findOne({
                where:{
                    name :value
                } 
             }) 
             .then (supplier =>{
                 if(supplier){
                     return Promise.reject("Este Proveedor YA EXISTE")
                 }
             })        
         } ),
        check("direction")
            .notEmpty()
            .withMessage("Debe Ingresar Dirección"),
        check("mail")
            .notEmpty()
            .withMessage("Debe Ingresar MAIL ")
            .bail()
            .custom(function(value){              
                return db.Supplier.findOne({
                    where:{
                        email :value
                    } 
                 }) 
                 .then (supplier =>{
                     if(supplier){
                         return Promise.reject("Este EMAIL YA EXISTE ")
                     }
                 })        
             } ),  
    ],
    login:[
        check("usuario")
            .notEmpty()
            .withMessage("Debe ingresar Usuario Registrado")
            .bail()
            .custom(function(value){              
                    return db.User.findOne({
                        where:{
                            username :value
                        } 
                     }) 
                     .then (user =>{
                         if(!user){
                             return Promise.reject("Usuario INEXISTENTE")
                         }
                     })        
                 } ),
        check("contraseña")
            .notEmpty()
            .withMessage("Debe Ingresar Contraseña") 
    ],
    register:[
        check('usuario')
        .notEmpty().withMessage ("debe Ingresar USUARIO ")
        .bail()
        .isLength({min:8}). withMessage('Nombre De usuario MINIMO 8 caractres')
        .bail()
        .custom(function(value){              
            return db.User.findOne({
                where:{
                    userName :value
                } 
             }) 
             .then (user =>{
                 if(user){
                     return Promise.reject("Usuario INEXISTENTE ") 
                 }
             })        
         } )
        ,
        check('primerNombre')
        .notEmpty().withMessage ("Debe Ingresar NOMBRE ")
        .bail()
        .isLength({min:2}).withMessage('Debe ingresar NOMBRE válido'),        
        check('apellido')
        .notEmpty().withMessage ("Debe Ingresar APELLIDO")
        .bail()
        .isLength({min:2}).withMessage('Debe ingresar un APELLIDO válido'),
        check('contraseña')
        .notEmpty().withMessage ("Ingrese una CONTRASEÑA")
        .bail()
        .isLength({min:5}).withMessage('Contraseña debe ser mínimo 5 caracteres'),        
        check('mail') 
        .notEmpty().withMessage("Email vacio")
        .bail()     
        .isEmail().withMessage('Mail NO Válido')
        .bail()
        .custom(function(value){              
            return db.User.findOne({
                where:{
                    email :value
                } 
             }) 
             .then (user =>{
                 if(user){
                     return Promise.reject("EMAIL ya está regitrado -Verifique")
                 }
             })        
         } ),
       
        check('fechaNacimiento')
        .notEmpty().withMessage ("Fecha de Nacimiento DEBE SER COMPLETADA ")
        .bail()
        .isDate().withMessage('Fecha Incorrecta ')
        // falta que sea mayor de edad buscar la función que dió AXEL
        .bail(),
        
        check('terminos')
        .notEmpty().withMessage('Debe aceptar Términos y condiciones ')

    ],
    updateUser: [
        
        check('primerNombre')
        .notEmpty().withMessage ("Debe Ingresar NOMBRE ")
        .bail()
        .isLength({min:2}).withMessage('Debe ingresar NOMBRE válido'),        
        check('apellido')
        .notEmpty().withMessage ("Debe Ingresar APELLIDO")
        .bail()
        .isLength({min:2}).withMessage('Debe ingresar un APELLIDO válido'),               
        check('mail') 
        .notEmpty().withMessage("Email vacio")
        .bail()     
        .isEmail().withMessage('Mail NO Válido')
        .bail()     
        ,
        check('fechaNacimiento')
        .notEmpty().withMessage ("Fecha de Nacimiento DEBE SER COMPLETADA ")
        .bail()
        .isDate().withMessage('Fecha Incorrecta '),
        // falta que sea mayor de edad buscar la función que dió AXEL
        check('categoria')
        .notEmpty().withMessage ("Debe ingresar Categoría( usuario/administrador) ")
    ],
    olvidoV :[
        check('mail') 
        .notEmpty().withMessage("Email vacio")
        .bail()     
        .isEmail().withMessage('Mail NO Válido')
        .bail()
        .custom(function(value){              
            return db.User.findOne({
                where:{
                    email :value
                } 
             }) 
             .then (user =>{
                 if(!user){
                     return Promise.reject("MAIL INEXISTENTE")
                 }
             })        
         } )

    ],
    cambioP :[
        check('contraseña1') 
        .notEmpty().withMessage("Complete CONTRASEÑA")         
        .bail()
        .isLength({min:5}).withMessage('Contraseña debe ser mínimo 5 caracteres'),
        check('contraseña2') 
        .notEmpty().withMessage("Debe reconfirmar Contraseña")         
        .bail()
        .isLength({min:5}).withMessage('Contraseña debe ser mínimo 5 caracteres')   
        
    ]
}

module.exports = validatorEXP