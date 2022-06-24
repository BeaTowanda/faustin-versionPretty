const fs = require("fs");
const path = require("path");
const modelCrud = require("../data/modelCrud");
//const {validationResult, body} = require("express-validator")
const { validationResult, body } = require("express-validator");

const productModel = modelCrud("factura");

const db = require("../src/database/models");
const req = require("express/lib/request");
const { equal } = require("assert");
const UserTax = require("../src/database/models/User-Tax");

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
const controller = {
  enlaces: (req, res) => {
    let userHead= invitado(req.session.usuario)
    if (
      req.session.usuarioLogueado &&
      req.session.usuarioLogueado.categoria == 2
    ) {
      res.render("enlacesDB", { user:userHead} )
    } else {
      let mensaje = "SU CATEGORIA DE USUARIO NO HABILITA ESTA OPERACION";
      res.render("mensajesDB", { mensaje: mensaje, user:userHead });
    }
  },
  altaType: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    db.ProductType.findAll({
      order: [["id", "ASC"]],
    }).then(function (productTypes) {
      
      if (productTypes) {
        res.render("altaTypeDb", { array: productTypes, user: userHead });
      } else {
        res.render("altaTypeDb", { array, user:userHead });
      }
    });
  },
  creaType: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    // inicializo Variables
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    const errors = validationResult(req);

    db.ProductType.findAll({
      order: [["id", "ASC"]],
    }).then(function (productTypes) {
      //chequea errores
      if (errors.errors.length > 0) {
        // SIGO CON ERROR FANTASMA
        res.render("altaTypeDb", {
          errorsProd: errors.mapped(),
          array: productTypes,
          user:userHead
        });
      } else {
       
        let newType = {
          type_name: req.body.name,
        };
        db.ProductType.create(newType);
        res.render("enlacesDB" , {user:userHead});
      } // termina el IF
    });
  },
  listType: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    db.ProductType.findAll({
      order: [["id", "ASC"]],
    }).then(function (productTypes) {
      if (productTypes) {
        res.render("listTypeDb", { array: productTypes, user:userHead });
      } else {
        res.render("listTypeDb", { array, user:userHead });
      }
    });
  },
  deleteType: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    db.ProductType.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      let mensaje = "baja exitosa";
      res.render("mensajesDB", { mensaje: mensaje, user:userHead });
    });
  },
  altaYear: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    let array = [
      {
        id: 0,
        year_name: " ",
      },
    ];
    db.ProductYear.findAll({
      order: [["id", "ASC"]],
    }).then(function (productYears) {
      if (productYears) {
        res.render("altaYearDb", { array: productYears, user:userHead });
      } else {
        res.render("altaYearDb", { array, user:userHead });
      }
    });
  },
  creaYear: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    // inicializo Variables
    let array = [
      {
        id: 0,
        year_name: " ",
      },
    ];
    const errors = validationResult(req);
    //
    db.ProductYear.findAll({
      order: [["id", "ASC"]],
    }).then(function (productYear) {
      //chequea errores
      if (errors.errors.length > 0) {
        // SIGO CON ERROR FANTASMA
        res.render("altaYearDb", {
          errorsProd: errors.mapped(),
          array: productYear,
          user: userHead
        });
      } else {
        let newYear = {
          year_name: req.body.name,
        };
        db.ProductYear.create(newYear);
        res.render("enlacesDB", {user:userHead} )
      } // termina el IF
    });
  },
  listYear: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    db.ProductYear.findAll({
      order: [["id", "ASC"]],
    }).then(function (productYears) {
      if (productYears) {
        res.render("listYearDb", { array: productYears, user:userHead });
      } else {
        res.render("listYearDb", { array, user:userHead });
      }
    });
  },
  deleteYear: (req, res) => {
    db.ProductYear.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      let mensaje = "baja exitosa";
      res.render("mensajesDB", { mensaje: mensaje ,user:userHead});
    });
  },

  altaColection: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    let array = [
      {
        id: 0,
        year_name: " ",
      },
    ];
    db.ProductColection.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColections) {
      if (productColections) {
        res.render("altaColectionDb", { array: productColections, user: userHead });
      } else {
        res.render("altaColectionDb", { array, user:userHead });
      }
    });
  },
  creaColection: (req, res) => {
    let userHead = invitado(req.session.usuarioLogueado)
    // inicializo Variables
    let array = [
      {
        id: 0,
        colection_name: " ",
      },
    ];
    const errors = validationResult(req);
   

    //
    db.ProductColection.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColections) {
      //chequea errores
      if (errors.errors.length > 0) {
        res.render("altaColectionDb", {
          errorsProd: errors.mapped(),
          array: productColections,
        });
      } else {
      
        let newColection = {
          colection_name: req.body.name,
        };
        db.ProductColection.create(newColection);
        res.render("enlacesDB", { user:userHead});
      } // termina el IF
    });
  },
  listColection: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let array = [
      {
        id: 0,
        colection_name: " ",
      },
    ];
    db.ProductColection.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColections) {
      if (productColections) {
        res.render("listColectionDb", { array: productColections, user:userHead });
      } else {
        res.render("listColectionDb", { array, user: userHead });
      }
    });
  },
  deleteYear: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    db.ProductYear.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      let mensaje = "BAJA AÑO HA SIDO REALIZADA";
      res.send("mensajesDB", { mensaje: mensaje, user:userHead });
    });
  },
  Colection: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    db.ProductColection.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColections) {
      if (productColections) {
        res.render("listColectionDb", { array: productColections, user:userHead });
      } else {
        res.render("listColectionDb", { array , user:userHead });
      }
    });
  },
  deleteColection: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    db.ProductColection.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      let mensaje = "baja exitosa";
      res.render("mensajesDB", { mensaje: mensaje, user:userHead });
    });
  },
  altaColor: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let array = [
      {
        id: 0,
        year_name: " ",
      },
    ];
    db.ProductColor.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColors) {
      if (productColors) {
        res.render("altaColorDb", { array: productColors, user:userHead });
      } else {
        res.render("altaColorDb", { array, user:userHead });
      }
    });
  },
  creaColor: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    // inicializo Variables
    let array = [
      {
        id: 0,
        color_name: " ",
        color_image: " ",
      },
    ];
    const errors = validationResult(req);
    //
    db.ProductColor.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColors) {
      //chequea errores
      if (errors.errors.length > 0) {
        res.render("altaColorDb", {
          errorsProd: errors.mapped(),
          array: productColors,
          user:userHead
        });
      } else {
        let newColor = {
          color_name: req.body.name,
          color_image: req.body.image,
        };
        db.ProductColor.create(newColor);
        res.render("enlacesDB", {user:userHead});
      } // termina el IF
    });
  },
  listColor: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    db.ProductColor.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColors) {
      if (productColors) {
        res.render("listColorDb", { array: productColors, user:userHead });
      } else {
        res.render("listColorDb", { array , user:userHead});
      }
    });
  },
  deleteColor: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    db.ProductColor.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      let mensaje = "baja exitosa";
      res.render("mensajesDB", { mensaje: mensaje, user:userHead });
    });
  },
  altaProduct: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    //VER LA AUTORIZACIÓN SEGURAMENTE LA PONGO EN ENLACES.. POR AHORA SIN AUTO
  
    // FALTA VER QUE PASA CON UN PRODUCTO QUE TIENE VARIOS COLORES . ver en VALIDATOR
    let cantidades = [];
    let colors = db.ProductColor.findAll();
    let years = db.ProductYear.findAll();
    let types = db.ProductType.findAll();
    let colections = db.ProductColection.findAll();
    Promise.all([colors, years, types, colections]).then(function ([
      productColors,
      productYears,
      productTypes,
      productColections,
    ]) {
      return res.render("altaProductoDB", {
        colors: productColors,
        years: productYears,
        types: productTypes,
        colections: productColections,
        cantidades,
        user:userHead
      });
    });
  },

  creaProduct: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    const errors = validationResult(req);

    if (errors.errors.length > 1) {
      /*ver esto porque hay un error que no encuentro y puse 1 */

      /*armo valores para modificar falta CUANDO HAGA MODIFICAFR */

      let colors = db.ProductColor.findAll();
      let years = db.ProductYear.findAll();
      let types = db.ProductType.findAll();
      let colections = db.ProductColection.findAll();

      Promise.all([colors, years, types, colections]).then(function ([
        productColors,
        productYears,
        productTypes,
        productColections,
      ]) {
        return res.render("altaProductoDB", {
          errorsProd: errors.mapped(),
          colors: productColors,
          years: productYears,
          types: productTypes,
          colections: productColections,
          user:userHead
        });
      });
    }
    if (errors.errors.length == 1) {
      let fecha= new Date();
      db.Product.create({
        name: req.body.name,
        description: req.body.description,
        description2: req.body.description2,
        price: req.body.price,
        dto: req.body.descuento,
        created : fecha,
        id_colection: req.body.colection,
        id_product_year: req.body.anio,
        id_type: req.body.tipo,
        image_ppal: req.body.imagenPPAL,
        image_back: req.body.imagenDORSO,
        image_det1: req.body.imagenDetalle1,
        image_det2: req.body.imagenDetalle2,
        image_det3: req.body.imagenDetalle3,
      })

        .then(function (product) {
          // tengo que pasar un array
          //tengo armar el input como una array y modificar en validator
          return product.setColoresDB(req.body.colores);
        })
        .then(function () {
          let mensaje = "alta exitosa";
          res.render("mensajesDB", { mensaje: mensaje, user:userHead });
        });
    }
    ///******************************************* */
  },
  listarProduct: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let array = [];
    db.Product.findAll({
      order: [["created", "DESC"]],
    }).then(function (products) {
      if (products) {
        res.render("listProductsDB", { array: products, user:userHead });
      } else {
        res.render("listProductsDB", { array, user:userHead });
      }
    });
  },
  armarApi: async (req, res) => {

    let productos = await db.ProductType.findAll({
      include: ["typesP"],
    });
    return res.json(productos);
  },
  detailOneDB: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let producto = db.Product.findOne({
      where: {
        id: req.params.id,
      },
      //  include :["coloresDB"],
      include: ["pYear", "pColection", "pType", "coloresDB"],
    });
    let colors = db.ProductColor.findAll();
    let years = db.ProductYear.findAll();
    let types = db.ProductType.findAll();
    let colections = db.ProductColection.findAll();

    Promise.all([producto, colors, years, types, colections]).then(function ([
      product,
      productColors,
      productYears,
      productTypes,
      productColections,
    ]) {
      //return  res.json(product)
      return res.render("updateProductoDB", {
        colors: productColors,
        years: productYears,
        types: productTypes,
        colections: productColections,
        producto: product,
        user:userHead
      });
    });
    //let producto = productModel.find(id);
    //res.render("updateProductoDB",{producto:producto,colors,years,types,colections})
  },
  storeUpdate: (req, res) => {
    // queda analizar la validación de colores.
    let userHead= invitado(req.session.usuarioLogueado)
    let id = req.params.id;
    const errors = validationResult(req);
  
    if (errors.errors.length > 1) {
      //*** */
      let producto = db.Product.findOne({
        where: {
          id: req.params.id,
        },
        //  include :["coloresDB"],
        include: ["pYear", "pColection", "pType", "coloresDB"],
      });
      let colors = db.ProductColor.findAll();
      let years = db.ProductYear.findAll();
      let types = db.ProductType.findAll();
      let colections = db.ProductColection.findAll();

      Promise.all([producto, colors, years, types, colections]).then(function ([
        product,
        productColors,
        productYears,
        productTypes,
        productColections,
      ]) {
        //return  res.json(product)
        return res.render("updateProductoDB", {
          colors: productColors,
          years: productYears,
          types: productTypes,
          colections: productColections,
          producto: product,
          errorsProd: errors.mapped(),
          user:userHead
        });
      });
    } else {
      // acordarse de error oculto por eso el 1
      if (errors.errors.length == 1) {
        let fecha= new Date();
        db.Product.update(
          {
            name: req.body.name,
            description: req.body.description,
            description2: req.body.description2,
            price: req.body.price,
            //falta tema imagenes
            dto: req.body.descuento,
            created : fecha,
            id_colection: req.body.colection,
            id_product_year: req.body.anio,
            id_type: req.body.tipo,
            image_ppal: req.body.imagenPPAL,
            image_back: req.body.imagenDORSO,
            image_det1: req.body.imagenDetalle1,
            image_det2: req.body.imagenDetalle2,
            image_det3: req.body.imagenDetalle3,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then(function () {
            return db.Product.findByPk(req.params.id);
          })
          .then(function () {
            let mensaje = "modificación exitosa";
            return res.render("mensajesDB", { mensaje: mensaje,user:userHead });
          });
      }
    }
  },
  irBajaProduct: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    res.render("listProdBAJADB",{ user:userHead});
  },
  bajaProducto: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    /* reconfirmar que quiere dar de baja */
    /* reconfirmar que quiere dar de baja */
    //let id = req.params.id
    //let producto = productModel.find(id);
    db.Product.findByPk(req.params.id).then(function (product) {
      res.render("bajaProductoDB", { producto: product, user:userHead });
    });

    //llamo a la tabla pivot
    //elimino todos los registros de la tabla pivot que tengan el id
  },
  storeDelete: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    //llamo a la tabla pivot
    //elimino todos los registros de la tabla pivot que tengan el id
    if (req.body.params < 12) {
      let mensaje = "NO PUEDE DAR DE BAJA ESTE PRODUCTO-DESARROLLO";
      res.render("mensajesDB", { mensaje: mensaje, user:userHead });
    }
    db.ProductColorProduct.destroy({
      where: {
        id_product: req.params.id,
      },
    })
      .then(function () {
        //elimino la pelicula
        return db.Product.destroy({
          where: {
            id: req.params.id,
          },
        });
      })
      .then(function () {
        let mensaje = "baja exitosa";
        return res.render("mensajesDB", { mensaje: mensaje, user:userHead });
      });
  },
  listarProductosRemito: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let array = [];

    db.Product.findAll({
      order: [["id", "ASC"]],
      include: ["coloresDB"],
    }).then(function (products) {
      //return res.json(products)
      if (products) {
        res.render("listProdRtosDB", { array: products, user:userHead });
      } else {
        res.render("listProdRtosDB", { array , user:userHead});
      }
    });
  },
  cargaRemitos: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let producto = db.Product.findOne({
      where: {
        id: req.params.id,
      },
      include: ["coloresDB"],
    });
    let coloresProd = db.ProductColorProduct.findAll({
      where: {
        id_product: req.params.id,
      },
    });

    Promise.all([producto, coloresProd]).then(function ([
      product,
      productColorProducts,
    ]) {
      return res.render("remitosDB", {
        producto: product,
        coloresProd: productColorProducts,
        user:userHead
      });
    });
  },
  storeRemitos: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    const errors = validationResult(req);
    console.log(req.body);
    if (req.body) {
      let suma = 0;
      for (i = 0; i < req.body.idRegistro.length; i++) {
        suma =
          parseInt(req.body.cantidadStock[i]) + parseInt(req.body.cantidad[i]);
        db.ProductColorProduct.update(
          {
            quantity: suma,
            dispach: req.body.remito[i],
          },
          {
            where: {
              id: req.body.idRegistro[i],
            },
          }
        );
      } // el del for
    } else {
      res.send("ver que pasó ");
    }
    res.render("enlacesDB", {user:userHead});
  },
  detail: (req, res) => {
  
    /*busco producto y oferta semanal */
    productoD = db.Product.findOne({
      where: {
        id: req.params.id,
      },
      include: ["pType", "pYear", "pColection", "coloresDB"],
    });
    ofertaD = db.ProductSale.findOne({
      where: {
        id_product: req.params.id,
      },
    });
    Promise.all([productoD, ofertaD]).then(function ([product, productSale]) {
      let userHead = invitado(req.session.usuarioLogueado)
      if (productSale) {
        return res.render("detallProdNuevoDB", {
          producto: product,
          oferta: productSale,
          user:userHead
        });
      } else {
        oferta = [];
        return res.render("detallProdNuevoDB", {
          producto: product,
          oferta: productSale,
          user:userHead
        });
      }
    });
  },
  comprar: async (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    if (!req.session.usuarioLogueado) {
      res.render("loginDB",{user:userHead});
    } else {
      const errors = validationResult(req);
      if (errors.errors.length > 0) {
        res.render("detallProdNuevoDB", { errorsProd: errors,user:userHead });
      } else {
        // cargo las bases que quiero usar
        try {
          let impuesto = await db.UserTax.findOne({
            where: {
              id_user: req.session.usuarioLogueado.id,
            },
          });
          if (!impuesto) {
            res.render("formularioTaxesDB", {user:userHead});
          } else {
            // de impuesto
            /*guardo los datos de impuestos para acompañar la factura en endCarrito */
            let impuestos = {
              id_user: impuesto.id_user,
              tax_condition: impuesto.tax_condition,
              cuit: impuesto.cuit,
              cuil: impuesto.cuil,
              ingresosBrutos: impuesto.ingresosBrutos,
              retGanancias: impuesto.retGanancias,
            };
            // calcula todos los descuentos y el total item
            // revisa si hay también precio de OFERTA SEMANAL
            let aux3 = 0;
            let precioBody = parseInt(req.body.precio);
            let dtoBody = parseInt(req.body.descuento);
            let precioSub = precioBody * parseInt(req.body.cantidadProducto);
            let dto = 100 - dtoBody;
            let aux2 = 0;
            aux3 = dto * 0.01;
            let aux1 = precioSub * aux3;
            if (req.body.ofertaSem != undefined) {
              let saleBody = parseInt(req.body.ofertaSem);
              let sale = 100 - saleBody;
              aux3 = sale * 0.01;
              aux2 = aux1 * aux3;
            } else {
              // de ofertaSem
              aux2 = aux1;
            }
            // termina los cálculos precio unitario
            let compra = await db.InvoiceItem.create({
              id_product: req.params.id,
              quantity: req.body.cantidadProducto,
              item_u_price: aux2,
              id_user: req.session.usuarioLogueado.id,
              made: 0,
            });
            let otrasCompras = await db.InvoiceItem.findAll({
              where: {
                id_user: req.session.usuarioLogueado.id,
                made: 0,
              },
              include: ["itemProduct"],
            });
            //return res.json(otrasCompras)
            let suma = 0;
            let montoItem = 0;
            //return res.json(otrasCompras)
            for (i = 0; i < otrasCompras.length; i++) {
              if (
                otrasCompras[i].item_u_price !== 0 ||
                otrasCompras[i].item_u_price !== undefined
              ) {
                // res.json(otrasCompras)
                montoItem = parseInt(otrasCompras[i].item_u_price);
                suma = suma + montoItem;
              } // fin del if
            } // final del for

            res.render("carritoDB", {
              compras: otrasCompras,
              suma: suma,
              impuestos: impuestos,
              user:userHead
            });
          } // el else de impuestos
        } catch (error) {
          // cierra el try
          console.log(error);
        }
      } // fin if errors
    } // fin usuarioLogueado
  },
  homeCarrito: async (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
      if (!req.session.usuarioLogueado) {
        res.render("loginDB", { user:userHead});
      } else {
       
          // cargo las bases que quiero usar
          try {
            let impuesto = await db.UserTax.findOne({
              where: {
                id_user: req.session.usuarioLogueado.id,
              },
            });
            if (!impuesto) {
              res.render("formularioTaxesDB", {user:userHead});
            } else {
              // de impuesto
              /*guardo los datos de impuestos para acompañar la factura en endCarrito */
              let impuestos = {
                id_user: impuesto.id_user,
                tax_condition: impuesto.tax_condition,
                cuit: impuesto.cuit,
                cuil: impuesto.cuil,
                ingresosBrutos: impuesto.ingresosBrutos,
                retGanancias: impuesto.retGanancias,
              };
              // calcula todos los descuentos y el total item
              // revisa si hay también precio de OFERTA SEMANAL
              /*let aux3 = 0;
              let precioBody = parseInt(req.body.precio);
              let dtoBody = parseInt(req.body.descuento);
              let precioSub = precioBody * parseInt(req.body.cantidadProducto);
              let dto = 100 - dtoBody;
              let aux2 = 0;
              aux3 = dto * 0.01;
              let aux1 = precioSub * aux3;
              if (req.body.ofertaSem != undefined) {
                let saleBody = parseInt(req.body.ofertaSem);
                let sale = 100 - saleBody;
                aux3 = sale * 0.01;
                aux2 = aux1 * aux3;
              } else {
                // de ofertaSem
                aux2 = aux1;
              }
              // termina los cálculos precio unitario
              let compra = await db.InvoiceItem.create({
                id_product: req.params.id,
                quantity: req.body.cantidadProducto,
                item_u_price: aux2,
                id_user: req.session.usuarioLogueado.id,
                made: 0,
              }); */
              let otrasCompras = await db.InvoiceItem.findAll({
                where: {
                  id_user: req.session.usuarioLogueado.id,
                  made: 0,
                },
                include: ["itemProduct"],
              });
              if ( otrasCompras.length === 0 ){
                let mensaje = "No tiene compras en CARRITO , elija un producto e inicie la compra";
                 res.render("mensajesDB", { mensaje: mensaje, user:userHead });
              }
              else { // SI tiene compras en carrito 
              //return res.json(otrasCompras)
            
                let suma = 0;
                let montoItem = 0;
                //return res.json(otrasCompras)
                for (i = 0; i < otrasCompras.length; i++) {
                  if (
                    otrasCompras[i].item_u_price !== 0 ||
                    otrasCompras[i].item_u_price !== undefined
                  ) {
                  // res.json(otrasCompras)
                  montoItem = parseInt(otrasCompras[i].item_u_price);
                  suma = suma + montoItem;
                 } // fin del if
                } // final del for
  
              res.render("carritoDB", {
                compras: otrasCompras,
                suma: suma,
                impuestos: impuestos,
                user: userHead
              });
            } // else de si no tiene compras
            
            } // el else de impuestos
          } catch (error) {
            // cierra el try
            console.log(error);
          }
        
      } // fin usuarioLogueado
    
  },
  borraCarrito: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    if (req.session.usuarioLogueado.id) {
      db.InvoiceItem.destroy({
        where: {
          id_user: req.session.usuarioLogueado.id,
          made: 0,
        },
      }).then(function () {
        let mensaje = "Se ha eliminado compras en CARRITO ";
        return res.render("mensajesDB", { mensaje: mensaje, user:userHead });
      });
    } else {
      // de usaurio Logueado
      res.render("loginDB", { user:userHead});
    }
  },
  finComprar: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let row = productModel.find(0);
    let suma = parseInt(req.params.suma);
    let impuestos = {
      tax_condition: req.body.taxCondicion,
      cuit: req.body.taxCuit,
      cuil: req.body.taxCuil,
      ingresosBrutos: req.body.taxBrutos,
      retGanancias: req.body.taxGanancias,
    };
    res.render("finCarritoDB", {
      facturacion: row,
      suma: suma,
      impuestos: impuestos,
      user:userHead
    });
  },
  creaFactura: async (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let total1 = parseInt(req.params.suma);

    try {
      // actualiza el nro de factura en JSON
      // busco el nro de factura
      let facturacion = productModel.find(0);
      let numeroFact = facturacion.numero + 1;
      let facturaData = {
        id: 0,
        numero: numeroFact,
        standard: facturacion.standard,
        premiun: facturacion.premiun,
      };
      productModel.update(facturaData);
      /*arma datos Factura*/
      let factura = {
        number: numeroFact,
        id_user: req.session.usuarioLogueado.id,
        delivery_dir: req.body.direccion,
        delivery_cost: req.body.costoDistribucion,
        total: total1,
      };
      /*guardo los datos de impuestos para acompañar la factura en endCarrito */
      let impuestos = {
        tax_condition: req.body.taxCondicion,
        cuit: req.body.taxCuit,
        cuil: req.body.taxCuil,
        ingresosBrutos: req.body.taxBrutos,
        retGanancias: req.body.taxGanancias,
      };
      /*arma datos impositivos */

      // actualiza el numero en invoiceItem
      let item = await db.InvoiceItem.update(
        {
          made: numeroFact,
        },
        {
          where: {
            id_user: req.session.usuarioLogueado.id,
            made: 0,
          },
        }
      );
      total1 = total1 + parseInt(req.body.costoDistribucion);

      res.render("carritoRegistraDB", {
        datos: factura,
        user: req.session.usuarioLogueado,
        impuestos: impuestos,
        user:userHead
      });
    } catch (error) {
      // final del try
      console.log(error);
    }
    //} // final del else
  },
  endCompra: async (req, res) => {
    let factura = await db.Invoice.create({
      number: req.body.factura,
      id_user: req.body.idUsuario,
      delivery_dir: req.body.direccion,
      delivery_cost: req.body.costoEnvio,
      total: req.body.total,
    });
    let mensaje = "SE CREO FACTURA EXISTOSAMENTE";
    res.render("mensajesDB", { mensaje: mensaje , user:userHead});
  },
  altaTaxes: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    res.render("formularioTaxesDB", {user:userHead});
  },
  storeTaxes: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      res.render("formularioTaxesDB", { errorsProd: errors, user:userHead });
    } else {
      db.UserTax.create({
        id_user: req.session.usuarioLogueado.id,
        tax_condition: req.body.condicion,
        cuil: req.body.cuil,
        cuit: req.body.cuit,
        ingresosBrutos: req.body.brutos,
        retGanancias: req.body.ganancias,
      }).then(function () {
        if (req.session.usuarioLogueado.cproduct !== 0) {
          db.Product.findOne({
            where: {
              id: req.session.usuarioLogueado.cprod.id,
            },
            include: ["pType", "pYear", "pColection", "coloresDB"],
          }).then(function (product) {
            //return res.json(product)
            res.render("detallProdNuevoDB", { producto: product, user:userHead });
          });
        }
        res.redirect("/");
      });
    } // fin de else
  },
  prodPorType: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    db.Product.findAll({
      where: {
        id_type: req.params.id,
      },
      include: ["pType"],
    }).then(function (products) {
      if (products) {
        let mensaje2 = products[0].pType.type_name;
        let mensaje = "TIPOS DE PRODUCTOS ";
        //return res.json(products)
        res.render("listProductGRALDB", {
          array: products,
          mensaje: mensaje,
          mensaje2: mensaje2,
          user: userHead
        });
      } else {
        let mensaje = "no hay productos disponibles";
        res.render("mensajesDB", { mensaje: mensaje, user:userHead });
      }
    });
  },
  mostrarOfertas: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    db.ProductSale.findAll({
      include: ["saleP"],
    }).then(function (productSales) {
      //return res.json(productSales)
      if (productSales) {
        //return res.json(productSales)
        res.render("ofertasDB", { produSales: productSales, user:userHead });
      } else {
        let mensaje = "NO HAY OFERTAS DISPONIBLES ";
        res.render("mensajesDB", { mensaje: mensaje , user:userHead});
      }
    });
  },
  updateOfertas: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let produSales = db.ProductSale.findAll({
      include: ["saleP"],
    });
    let productos = db.Product.findAll();
    Promise.all([produSales, productos]).then(function ([
      productSales,
      products,
    ]) {
      // return res.json(productSales)
      if (productSales) {
        //return  res.json(products)
        return res.render("updateOfertas", {
          productos: products,
          produSales: productSales,
          user:userHead
        });
      } else {
        let produSales = [];
        let saleP = [];
        return res.render("updateOfertas", {
          productos: products,
          produSales: produSales,
          saleP: saleP,
          user:userHead
        });
      }
    });
  },
  storeOfertas: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      let prodSales = db.ProductSale.findAll({
        include: ["saleP"],
      });
      let productos = db.Product.findAll();
      Promise.all([prodSales, productos]).then(function ([
        productSales,
        products,
      ]) {
        if (typeof productSales == !undefined) {
          return res.render("updateOfertas", {
            productos: products,
            produSales: productSales,
            errorsProd: errors.mapped(),
            user:userHead
          });
        } // en else de errores
        else {
          let produSales = [];
          let saleP = [];
          return res.render("updateOfertas", {
            productos: products,
            produSales: produSales,
            saleP: saleP,
            errorsProd: errors.mapped(),
            user:userHead
          });
        }
      });
    } else {
      for (i = 0; i < req.body.producto.length; i++) {
        db.ProductSale.update(
          {
            dtoSale: req.body.descuento,
            id_product: req.body.producto[i],
          },
          {
            where: {
              id: i,
            },
          }
        );
      }
      let mensaje = "SE HA MOIFICADO OFERTA SEMANAL";
      res.render("mensajesDB", { mensaje: mensaje, user:userHead });
    } // fin del else
  },
  search: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let verprimera = req.query.busca.split(" ");
    let busca1 = verprimera[0];
    let idBusca = verprimera[1];
    switch (busca1) {
      case "C":
        db.Product.findAll({
          where: {
            id_colection: idBusca,
          },
          include: ["pType", "pColection", "pYear", "coloresDB"],
        }).then(function (products) {
          // if(req.query.nombre == "todos"){
          if (products.length > 0) {
            let mensaje = "Productos según Colección ";
            mensaje2 = products[0].pColection.colection_name;
            res.render("listProductGRALDB", {
              array: products,
              mensaje: mensaje,
              mensaje2: mensaje2,
              user:userHead
            });
          } else {
            let mensaje = "No Hay productos que coincidan con su BÚSQUEDA";
            res.render("mensajesDB", { mensaje: mensaje, user:userHead });
          }
        });
        break;
      case "Y":
        db.Product.findAll({
          where: {
            id_product_year: idBusca,
          },
          include: ["pType", "pColection", "pYear", "coloresDB"],
        }).then(function (products) {
          // if(req.query.nombre == "todos"){
          if (products.length > 0) {
            let mensaje = "Tu Selección de Productos por Año Lanzamiento";
            let mensaje2 = products[0].pYear.year_name;
            res.render("listProductGRALDB", {
              array: products,
              mensaje: mensaje,
              mensaje2: mensaje2,
              user:userHead
            });
          } else {
            let mensaje = "NO hay productos que coincidan con su BÚSQUEDA ";
            res.render("mensajesDB", { mensaje: mensaje , user:userHead});
          }
          // return res.json(products)
        });
        break;
      case "T":
        db.Product.findAll({
          where: {
            id_type: idBusca,
          },
          include: ["pType", "pColection", "pYear", "coloresDB"],
        }).then(function (products) {
          // if(req.query.nombre == "todos"){
          if (products.length > 0) {
            let mensaje = "Tu Selección de Productos ";
            let mensaje2 = products[0].pType.type_name;
            res.render("listProductGRALDB", {
              array: products,
              mensaje: mensaje,
              mensaje2: mensaje2,
              user:userHead
            });
          } else {
            let mensaje = "NO hay productos que coincidan con su BÚSQUEDA ";
            res.render("mensajesDB", { mensaje: mensaje,user:userHead });
          }
          //return res.json(products)
        });
        break;
      case "all":
        db.Product.findAll({
          order :[["created","DESC"]],
          include: ["pType", "pColection", "pYear", "coloresDB"],
        }).then(function (products) {
          // if(req.query.nombre == "todos"){
          let mensaje = "Todos los productos Disponibles ";
          let mensaje2 = "";
          res.render("listProductGRALDB", {
            array: products,
            mensaje: mensaje,
            mensaje2: mensaje2,
            user:userHead
          });
          //return res.json(products)
        });
        break;
      case "O":
        let mensaje =
          "SELECCIONÁ EL ICONO % EN LA BARRA para ver las OFertas de la Semana ";
        res.render("mensajesDB", { mensaje: mensaje, user:userHead });
        break;
      default:
        res.send("error en búsqueda");
    }
  },
  carrito: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    res.render("carritoDeCompras", {user:userHead});
  },
  finCarrito: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    res.render("finCarrito",{ user:userHead});
  },
  list: (req, res) => {
    let userHead= invitado(req.session.usuarioLogueado)
    let productsFound = productModel.all();
    res.render("listProductos", { products: productsFound, user:userHead });
  },
  probar: (req, res) => {
    console.log("en probar ver que hay en req.session");
    console.log("el id" + req.session.usuarioLogueado);
    console.log("el producto" + req.session.usuarioLogueado);
  },
};

module.exports = controller;
