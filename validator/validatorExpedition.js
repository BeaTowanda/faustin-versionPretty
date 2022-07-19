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
    remitoProveedor:[
        check("proveedor")
            .notEmpty()
            .withMessage("Debe seleccionar UN PROVEEDOR de la BASE"),       
        
        check('deposito')
        .notEmpty().withMessage ("debe Elegir DEPOSITO RECEPCTIVO ")
        ,
        check('prodColorBody')
        .notEmpty().withMessage ("Debe seleccionar al menos 1 PRODUCTO-COLOR ")
        ,   
        check('remito')
        .notEmpty().withMessage ("Debe Ingresar REMITO PROVEEDOR ")
        ,
        check('fechaRec')
        .notEmpty().withMessage('Debe ingresar Fecha ')
        ,
        check('dni')
        .notEmpty().withMessage('Debe ingresar DNI recepctor ')

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