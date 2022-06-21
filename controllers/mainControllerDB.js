const { urlencoded } = require("express");
const fs = require("fs");
const path = require("path");

const db = require("../src/database/models");

const sequelize = db.sequelize;
random= function(){
  let xslice = longitud-14;
  let numeroSlice = Math.floor(Math.random()*(xslice+1));
 return numeroSlice 
}

randomHome= function(longitud){
  console.log(longitud)
  let xhome = longitud-4;
  let numeroHome= Math.floor(Math.random()*(xhome+1));
 return numeroHome 
}
function invitado(ver){
  /*+++ arma datos para el header **/
  let userHead ={
    usuario : "no",
    administrador : 0
  }
  if (ver !== undefined){
    console.log("está en function invitado"+ ver.usuario) 
    userHead.usuario = ver.usuario;
    userHead.administrador = ver.categoria ;

    return userHead
    }
      else {return userHead}
}
const mainControllerDB = {
    home: (req, res) => {    
      
      let producto = db.Product.findAll({
        include: ["pType","pYear","pColection"]
      })    
      let types = db.ProductType.findAll();
      let colections= db.ProductColection.findAll();
      let anios = db.ProductYear.findAll();
      let colores= db.ProductColor.findAll();
      Promise.all([producto,types,colections,anios,colores]).then(function (
     [
          product,
          productTypes,
          productColections,
          productYears,
          productColors,
         
        ]) {
        
         //return res.json(product) 
         let longitud= product.length 
         let xslice=longitud-14;
         let xhome=longitud-1;
          indiceSlice=  Math.floor(Math.random()*(xslice+1));
          finalSlice= indiceSlice+14; 
          indiceHome =  Math.floor(Math.random()*(xhome+1)); 
          finalHome= indiceHome + 3;
          //
          let userHead=invitado(req.session.usuarioLogueado);
          
          return res.render("homeDB", {
           producto: product,
           tipos: productTypes,
           colecciones :productColections,
           anios : productYears,
           colores:productColors,
           indiceSlice:indiceSlice,
           finalSlice:finalSlice,
           indiceHome:indiceHome,
           finalHome:finalHome,
           user:userHead      
          }
          );
        }
      )}
  }


module.exports=mainControllerDB;