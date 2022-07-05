const fs = require("fs");
const path = require("path");
const modelCrud = require("../data/modelCrud");
//const {validationResult, body} = require("express-validator")
const { validationResult, body } = require("express-validator");

const productModel = modelCrud("factura");

const db = require("../src/database/models");
const req = require("express/lib/request");
const { equal } = require("assert");


const sequelize = db.sequelize;

function invitado(ver){
  /*+++ arma datos para el header **/
  let userHead ={
    usuario : "no",
    administrador : 0
  }
  if (ver !== undefined){
     
    userHead.usuario = ver.usuario;
    userHead.administrador = ver.categoria ;
    
    return userHead
    }
      else {return userHead}
}
  /************* */
  const controller ={
    enlaces: (req, res) => {
        let userHead= invitado(req.session.usuario);  
        res.render("expeditionDB" ,{user:userHead})
    },
    listarProdColorProd: (req,res) =>{
      let userHead= invitado(req.session.usuario);  
      db.ProductColorProduct.findAll()
      .then (function(productColorProduct){
       // return res.json(productColorProduct)
        res.render("listarProdColorPrueba",{user:userHead, tabla:prodColorProd})
      })
    },
    altaDeposito: (req,res) =>{
      let userHead= invitado(req.session.usuario); 
      db.Deposit.findAll()
      .then(function(deposit){
        res.render("altaDeposit",{user:userHead , array:deposit})
      })
    },
    creaDeposito: (req,res) => {
      let userHead= invitado(req.session.usuario); 
      const errors = validationResult(req);

      if (errors.errors.length > 0) {
        db.Deposit.findAll()
        .then (function(deposit){
          res.render("altaDeposit",{user:userHead, array:deposit , errorsProd:errors.mapped()})
        })
      } else{
        let newD= {
          name:req.body.name,
          onCharge:req.body.oncharge,
          direction:req.body.direction,
          zona:1,
          horary:req.body.horary
        };
        db.Deposit.create(newD);
        let mensaje="ALTA depósito exitosa";
        res.render("mensajesDB",{user:userHead, mensaje:mensaje})
      }
    },
    altaProveedor: (req,res) =>{
      let userHead= invitado(req.session.usuario); 
      db.Supplier.findAll()
      .then(function(supplier){
        res.render("altaSupplier",{user:userHead , array:supplier})
      })
    },
    creaProveedor: (req,res) => {
      let userHead= invitado(req.session.usuario); 
      const errors = validationResult(req);

      if (errors.errors.length > 0) {
        db.Supplier.findAll()
        .then (function(supplier){
          if (supplier){
          res.render("altaSupplier",{user:userHead, array:supplier, errorsProd:errors.mapped()})
          } else{
            array= [],
            res.render("altaSupplier", {user:userHead , array:array,errosProd:errors.mapped() })
          }
        })
      } else{
        let fecha= new Date();
        console.log("ver que pasa con la fecha ");
        console.log(fecha + "es la fecha ");
        let newD= {
          name:req.body.name,
          direction:req.body.direction,
          zona:1,
          tax_condition: req.body.condition,
          cuil: req.body.cuil,
          cuit: req.body.cuit,
          ingresosBrutos:req.body.brutos,
          retGanancias:req.body.ganancias,
          date_register:fecha,
          email:req.body.mail
        };
        db.Supplier.create(newD);
        let mensaje="ALTA proveedor exitosa";
        res.render("mensajesDB",{user:userHead, mensaje:mensaje})
      }
    }
  };
  module.exports = controller;
