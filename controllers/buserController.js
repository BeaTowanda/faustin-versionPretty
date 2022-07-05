const fs = require("fs");
const path = require("path");
const { urlencoded } = require("express");
const { validationResult, body } = require("express-validator");
//const modelCrud = require('../data/modelCrud');
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
const { redirect } = require("express/lib/response");

const db = require("../src/database/models");
const req = require("express/lib/request");
const sequelize = db.sequelize;

function validarContraseña(userID, bodycontraseña) {
  let contraseñaGuardada = userID.password;
  return bcrypt.compareSync(bodycontraseña, contraseñaGuardada);
}
function invitado(ver){
  /*+++ arma datos para el header **/
  let userHead ={
    usuario : "no",
    administrador : 0
  }
  if (ver !== undefined){
    console.log("está en function invitado") 
    userHead.usuario = ver.usuario;
    userHead.administrador = ver.categoria ;
    return userHead
    }
      else {return userHead}
}
//************************** */
const controller = {
  altaCategory: (req, res) => {
    let array = [
      {
        id: 0,
        category_name: " ",
      },
    ];
    db.UserCategory.findAll({}).then(function (userCategorys) {
      let userHead = invitado(req.session.usuarioLogueado)
      if (userCategorys) {
        res.render("altaCategoryDb", { array: userCategorys, user:userHead });
      } else {
        res.render("altaCategoryDb", { array });
      }
    });
  },
  creaCategory: (req, res) => {
    // inicializo Variables
    let array = [
      {
        id: 0,
        category_name: " ",
      },
    ];
    const errors = validationResult(req);
    db.UserCategory.findAll().then(function (userCategorys) {
      let userHead = invitado(req.session.usuarioLogueado)
      //chequea errores
      if (errors.errors.length > 0) {
        res.render("altaCategoryDb", {
          errorsProd: errors.mapped(),
          array: userCategorys,
          user: userHead
        });
      } else {
        let newCategory = {
          category_name: req.body.name,
        };
        db.UserCategory.create(newCategory);
        res.render("enlacesDB",{user:userHead});
      } // termina el IF
    });
  },
  listCategory: (req, res) => {
    let array = [
      {
        id: 0,
        category_name: " ",
      },
    ];
    db.UserCategory.findAll().then(function (userCategorys) {
      let userHead = invitado(req.session.usuarioLogueado)
      if (userCategorys) {
        res.render("listCategoryDb", { array: userCategorys, user:userHead });
      } else {
        res.render("listCategoryDb", { array, user:userHead });
      }
    });
  },
  deleteCategory: (req, res) => {
    db.UserCategory.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      let userHead = invitado(req.session.usuarioLogueado)
      res.send("baja existosa",{user:userHead});
    });
  },
  login: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    res.render("loginDB",{user:userHead});
  },
  processLogin: (req, res) => {
    const errors = validationResult(req);
    let userHead = invitado(req.session.usuarioLogueado);
    if (errors.errors.length > 0) {      
      res.render("loginDB", { errorsLogin: errors.mapped(),user:userHead });
    }

    db.User.findOne({
      where: {
        userName: req.body.usuario,
      },
    }).then(function (user) {
      // return ({
      if (user) {
        let bodycontraseña = req.body.contraseña;
        //let result = validarContraseña(user, bodycontraseña);
        //console.log(result);
        if (validarContraseña(user, bodycontraseña)) {
          if (req.body) {
            let userlog = {
              //aquí
              id: user.id,
              usuario: req.body.usuario,
              primerNombre: user.first_name,
              apellido: user.last_name,
              mail: user.email,
              categoria: user.id_category,
              cproduct: 0,
              //avatar: userFound.avatar,
            };
            req.session.usuarioLogueado = userlog;

            if (req.body.recordame) {
              res.cookie("usercookie", user.id, { maxAge: 50000 * 24 });
              //res.send(req.cookie)
            }
            res.redirect("/");
          }
        } else {
          let mensaje = "Credenciales Incorrectas";
          res.render("mensajesDBuser", { mensaje: mensaje, user:userHead });
        }
      }
    });
  },

  forgot: (req, res) => {
    let userHead = invitado(eq.session.usuarioLogueado)
    res.render("loginOlvideDB",{user:userHead});
  },

  activarSesion: (req, res) => {
    let errors = [];
    errors = validationResult(req);
    let userHead = invitado(req.session.usuarioLogueado)
    if (errors.errors.length > 0) {
      return res.render("loginOlvideDB", { errorsOlvido: errors.mapped(), user:userHead });
    }
    res.render("loginDB",{user:userHead});
  },
  register: (req, res) => {
   let userHead = invitado(req.session.usuarioLogueado);
   console.log(req.session.usuarioLogueado + "usuario Logueado");
   console.log(userHead.usuario);
   console.log(userHead.administrador);
    res.render("formularioRegistroDb",{user:userHead});
  },
  altaRegister: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado);
    console.log(req.session.usuarioLogueado.usuario + "usuario Logueado");
    console.log(userHead.usuario + " es userHead.usuario");
    console.log(userHead.administrador);
    let errors = [];
    errors = validationResult(req);

    if (errors.errors.length > 0) {
      return res.render("formularioRegistroDb", { errorsReg: errors.mapped(), user:userHead });
    } else {
      // si es usuario autorizado puede elegir categoría
      if(( userHead.usuario !=="no") && (userHead.administrador=== 2) ){
        catBody = req.body.categoria
      }else {
        catBody = 1
      }
      db.UserCategory.findOne({
        where: {
          category_name: catBody,
        },
      }).then(function (userCategory) {
        return db.User.create({
          userName: req.body.usuario,
          first_name: req.body.primerNombre,
          last_name: req.body.apellido,
          email: req.body.mail,
          bornDate: req.body.fechaNacimiento,
          id_category: userCategory.id,
          // fechaAlta: fecha,
          //req.file ? req.file.filename : "image-default"
          password: bcrypt.hashSync(req.body.contraseña, 10),
          avatar: req.file ? req.file.filename : "DEFAULT.jpg",
        });
      });
    }
    res.render("loginDB",{user:uderHead});
  },
  list: function (req, res) {
    let userHead = invitado(req.session.usuarioLogueado)
    db.User.findOne({
      where: {
        id: req.session.usuarioLogueado.id,
      },
    }).then(function (user) {
      if (user.id_category !== 2) {
        res.send("NO ESTÁ AUTORIZADO A REALIZAR ESTA OPERACIÓN");
      } else {
        db.User.findAll({
          include:["pCategory"]
        }).then(function (users) {
          res.render("listUsuariosDB", { array: users, user:userHead });
        });
      }
    });
  },
  detailOne: function (req, res) {
    let usuario = db.User.findOne({
      where: {
        id: req.params.id,
      },
    });
    let categorias = db.UserCategory.findAll();
    Promise.all([usuario, categorias]).then(function ([user, categorias]) {
      let userHead = invitado(req.session.usuarioLogueado)
      return res.render("updateUsuarioDB", {
        user: user,
        categorias: categorias,
        user:userHead
      });
    });
  },
  storeUpdate: function (req, res) {
    let id = req.params.id;
    let userHead = invitado(req.session.usuarioLogueado)
    let errors = [];
    errors = validationResult(req);
    if (errors.errors.length > 0) {
      let usuario = db.User.findOne({
        where: {
          id: req.params.id,
        },
      });
      let categorias = db.UserCategory.findAll();
      Promise.all([usuario, categorias]).then(function ([user, categorias]) {
        return res.render("updateUsuarioDB", {
          user: user,
          categorias: categorias,
          errorsUp: errors.mapped(),
          user:userHead
        });
      });
    } else {
      db.User.update(
        {
          first_name: req.body.primerNombre,
          last_name: req.body.apellido,
          email: req.body.mail,
          //avatar: req.body.avatar,
          bornDate: req.body.fechaNacimiento,
          id_category: req.body.categoria,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then(function () {
          return db.User.findByPk(req.params.id);
        })
        .then(function () {
          let mensaje = "Modificación exitosa";
          return res.render("mensajesDBuser", { mensaje: mensaje, user:userHead });
        });
      ////******* ahora actualizo la tabla PRODUCTCOLORPRODUCT
    }
  },
  baja: function (req, res) {
    let userHead = invitado(req.session.usuario)
    // usuario = session.usuarioLogueado.usuario
    // console.log(usuario + "  es el req.session.usuario")
    res.render("borrarUsuario",{user:userHead});
  },
  delete: function (req, res) {
    let userHead = invitado(req.session.usuarioLogueado)
    let errors = [];
    errors = validationResult(req);
    if (errors.errors.length > 0) {
      return res.render("borrarUsuario", { errorsOlvido: errors.mapped(), user:userHead });
    }
    let userFound = userModel.findMail(req.body.mail);
    userModel.delete(userFound.id);
    res.redirect("/");
  },
  cambioPass: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    
      res.render("loginIrCambioPassDB",{user:userHead});
   
  },
  processLoginCambio: (req, res) => {
    /***** todo igual a LOGIN pero MANDA A PAGINA DE CAMBIAR CONTRASEÑA  */
    const errors = validationResult(req);
    let userHead = invitado(req.session.usuarioLogueado)

    if (errors.errors.length > 0) {
      res.render("loginIrCambioPassDB", { errorsLogin: errors.mapped(), user:userHead });
    }
    /*** */
    db.User.findOne({
      where: {
        userName: req.body.usuario,
      },
    }).then(function (user) {
      // return ({
      if (user) {
        
        let bodycontraseña = req.body.contraseña;
        let result = validarContraseña(user, bodycontraseña);
        console.log(result);
        if (validarContraseña(user, bodycontraseña)) {
          if (req.body) {
            // aquí buscar el id de categoría.
            //proceso session
            let userlog = {
              //aquí
              id: user.id,
              usuario: req.body.usuario,
              primerNombre: user.first_name,
              apellido: user.last_name,
              mail: user.email,
              fechaNacimiento: user.bornDate,
              categoria: user.id_category,
              //avatar: userFound.avatar,
            };

            req.session.usuarioLogueado = userlog;
            

            if (req.body.recordame) {
              res.cookie("user", user.id, { maxAge: 50000 * 24 });
            }
            res.render("loginCambiaPassDB", { userL: user, user:userHead });
            //res.redirect("/");
          }
        } else {
          let mensaje = "Credenciales Incorrectas";
          res.render("mensajesDBuser", { mensaje: mensaje, user:userHead });
        }
      }
    });
  },

  forgot: (req, res) => {
    let userHead=invitado(req.session.usuarioLogueado)
    res.render("loginOlvideDB",{user:userHead});
  },

  activarSesion: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    let errors = [];
    errors = validationResult(req);
    if (errors.errors.length > 0) {
      return res.render("loginOlvideDB", { errorsOlvido: errors.mapped(), user:userHead });
    }
    res.render("loginDB",{user:userHead});
    /************************************* */
    let userID = userModel.findUser(req.body.usuario);
    //if (validarContraseña(userID)){

    let bodycontraseña = req.body.contraseña;

    let resultado = validarContraseña(userID, bodycontraseña);

    if (validarContraseña(userID, bodycontraseña)) {
      if (req.body) {
        //proceso session
        let user = {
          //aquí
          id: userID.id,
          usuario: req.body.usuario,
          primerNombre: req.body.primerNombre,
          apellido: req.body.apellido,
          mail: req.body.mail,
          fechaNacimiento: req.body.fechaNacimiento,
          categoria: req.body.categoria,
          //avatar: .avatar
        };

        req.session.usuarioLogueado = user;

        if (req.body.recordame) {
          res.cookie("user", user.id, { maxAge: 50000 * 24 });
        }

        res.render("loginCambiaPassDB", { userL: user, user:userHead });
      }
    } else {
      let mensaje = "Credenciales Incorrectas";
      res.send("mensajesDBuser", { mensaje: mensaje, user:userHead });
    }
  },
  processCambioP: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    const errors = validationResult(req);
    /*** */
    if (errors.errors.length > 0) {
      res.render("loginCambiaPassDB", { errorsLogin: errors.mapped(), user:userHead });
    } else {
      if (req.body.contraseña1 !== req.body.contraseña2) {
        res.send("contraseñas Ingresadas SON DISTINTAS ");
      }
    }
    //**** */
    
    //let userID =  userModel.find(req.session.usuarioLogueado.id);
    db.User.findByPk(req.session.usuarioLogueado.id).then(function (user) {
      if (user && validarContraseña(user, req.body.contraseña1)) {
        let mensaje = "NUEVA CONTRASEÑA deber ser DIFERENTE a la registrada";
        res.render("mensajesDBuser", { mensaje: mensaje, user:userHead });
      } else {
        db.User.update(
          {
            first_name: req.body.primerNombre,
            last_name: req.body.apellido,
            email: req.body.mail,
            password: bcrypt.hashSync(req.body.contraseña1, 10),
            //avatar: req.body.avatar,
            bornDate: req.body.fechaNacimiento,
            id_category: req.body.categoria,
          },
          {
            where: {
              id: req.session.usuarioLogueado.id,
            },
          }
        )
          .then(function () {
            return db.User.findByPk(req.session.usuarioLogueado.id);
          })
          .then(function () {
            let mensaje = "Se Ha realizado cambio de contraseña";
            return res.render("mensajesDBuser", { mensaje: mensaje, user:userHead });
          });
      }
    });
    res.redirect("/");
  },

  regTaxes: function (req, res) {
    let userHead = invitado(req.session.usuarioLogueado)
    // usuario = session.usuarioLogueado.usuario
    // res.render("confirmaLogout")
    res.render("formularioTaxesDB", { user:userHead } );
  },
 
  laMarca: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    res.render("marcaDB" , { user: userHead});
  },
  politica: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    res.render("politicaDevolucionesDB", { user: userHead});
  },
  confirmLogout: async (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    if (req.session.usuarioLogueado !== undefined){
        let usuario = await db.User.findOne({
          where:{
            id:req.session.usuarioLogueado.id
          }
        })  
        res.render("confirmLogout",{datos:usuario, user:userHead})
    }
    else{
      let mensaje = "Ud. NO está logueado al momento ";
      res.render("mensajesDB", { mensaje: mensaje, user: userHead });
      
    }

 },          
logout:function(req, res){  
  let userHead = invitado (req.session.usuarioLogueado)
    id= req.body.usuario;
    req.session.destroy();      
    res.clearCookie("usercookie",id);
    let mensaje = "operación LOGOUT existosa";
    res.render("mensajesDB", { mensaje: mensaje , user:userHead});
    
}
};

module.exports = controller;
