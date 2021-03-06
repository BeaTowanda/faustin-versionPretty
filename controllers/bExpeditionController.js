const fs = require("fs");
const path = require("path");
const modelCrud = require("../data/modelCrud");
//const {validationResult, body} = require("express-validator")
const { validationResult, body } = require("express-validator");

const productModel = modelCrud("factura");

const db = require("../src/database/models");
const req = require("express/lib/request");
const { equal } = require("assert");
const invoice = require("../src/database/models/invoice");


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
        let mensaje="ALTA dep??sito exitosa";
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
    },
    listVtasPending: async(req,res) =>{
      let userHead= invitado(req.session.usuario); 
      factura= await db.Invoice.findAll({
        where:{
          remitNumber : 1111111111
        },
        include:["invoiceUser"]
      })
      //return res.json(factura)
      console.log(factura.length + "es la lenght de factura ")
      //return res.json(factura)
      if (factura.length == 0){
        let mensaje = "NO hay facturas pendientes de remito ";
        // fecha
        let fecha = new Date()
        let mensaje2= fecha.toLocaleDateString() 
        //let mensaje2 =new Date()
        res.render("mensajesDB",{user:userHead , mensaje:mensaje, mensaje2:mensaje2})
      }
      else{
        let mensaje ="FACTURAS PENDIENTES DE ENTREGA";
        // fecha
        let fecha = new Date();
        let mensaje2 = fecha.toLocaleDateString()
        //return res.json(factura)
        //return res.json(factura)
        //  guarda cantidad de facturas en json
        let facturaData={};
        let senialRemito= 0;
        let senial= factura.length ;
        let facturacion = productModel.find(0);
        // prepara senial para displayar las facts que se pueden 
          if(facturacion.senialRemito == 0){
            senialRemito = 999;
            mensaje = "NO hay m??s Facturas CON STOCK p/remitir ";           
            facturaData = {
              id: 0,
              numero: facturacion.numero,
              remito:facturacion.remito,
              senialRemito:senialRemito,
              standard: facturacion.standard,
              premiun: facturacion.premiun
            }
            productModel.update(facturaData);
           
            res.render("mensajesDB", {user:userHead , mensaje: mensaje, mensaje2:mensaje2})
          } else {
            if (facturacion.senialRemito == 999){
              senialRemito= senial;
            } else{
              senialRemito = facturacion.senialRemito - 1;
            }
            facturaData = {
              id: 0,
              numero: facturacion.numero,
              remito:facturacion.remito,
              senialRemito:senialRemito,
              standard: facturacion.standard,
              premiun: facturacion.premiun
            }
            productModel.update(facturaData);
            res.render("listRtosPending" ,{user:userHead ,array:factura, mensaje:mensaje, mensaje2:mensaje2 , senialVa:senialRemito })
          }
        
      } // del else 
  },
  
  listItemsPending: async (req,res) =>{
    let userHead= invitado(req.session.usuario); 
    items = await db.InvoiceItem.findAll({
      where: {
        made : req.params.id
      },
      include:["itemProduct","itemColor","idPCP","invoiceR"]
    })  
    //return res.json(items)  
    if(items.length === 0 ){
        let mensaje = "no hay items pendientes de envio";
        let mensaje2 = "para la factura  :" + req.params.id ;
         res.render("mensajesDB", {user:userHead , mensaje: mensaje, mensaje2:mensaje2})
         
    } else{  
        console.log("longitud items "+ items.length) 
        console.log(items[0].itemProduct.name) 
        //return res.json(items)
        let productoNo=""
        for (i=0; i< items.length  ; i++){
          console.log("est?? en i = "+ i)
          if( (items[i].idPCP.quantity == null) || (items[i].idPCP.quantity == 0) || (items[i].quantity > items[i].idPCP.quantity )){
            productoNo= items[i].itemProduct.name;
            productoNoColor = items[i].itemColor.color_name;          
            // volver a listVtas Pending
            i = items.length;  
            console.log("entr?? en el if de stock insuficiente ")
            console.log(productoNo + "es productoNo "+ "el i = " + i)      
           } ;
        }// del for
        console.log(productoNo + " es productoNo cuando termina el for")
        let mensaje =""
        if (productoNo === ""){       
        console.log("sali?? del for en listItemsPendin")
        listDeposits= await db.Deposit.findAll();
        mensaje= "Productos A REMITIR con Stock"
        // prueba
        for (i=0 ; i< 2 ; i++){
          console.log(items[i].made + "es el made")
          console.log(items[i].itemProduct.id + ": es el id Product") 
          console.log(items[i].itemColor.id + ": es el id de COLOR") 
          console.log(items[i].quantity + ": es el cantidad") 
          console.log(items[i].invoiceR.id + ": es el id el id de INVOICE") 
          console.log(items[i].idPCP.id + ": es el id Product-color-product") 
          console.log(items[i].idPCP.quantity + ": es cantidad stock de product-color-product") 
        }
        //return res.json(items)

          res.render ("listInvoiceItem",{user:userHead ,mensaje: mensaje, array:items, depositos:listDeposits })
        }else{
          console.log("sale a renderizar mensajesEXP en el else")
          mensaje= "STOCK INSUFICIENTE" ;
          let productoNo2 = "Color : " + productoNoColor;
           res.render("mensajesEXP",{user:userHead , mensaje:mensaje, productoNo:productoNo,productoNo2: productoNo2 })
        }
      }   
  },
  creaItemRemitoUser: async(req,res) =>{
    let userHead= invitado(req.session.usuario); 
    for (i=0 ; i< 2 ; i++){
      console.log("con i= "+ i)
      //console.log(items[i].made + "es el made")
      console.log(req.body.madeBody + "es el made")

      //console.log(items[i].itemProduct.id + ": es el id Product") 
      console.log(req.body.idProduct[i] + "es el Product")
    
      //console.log(items[i].itemColor.id + ": es el id de COLOR") 
      console.log(req.body.idColor[i] + ": es el id de COLOR") 

      //console.log(items[i].quantity + ": es el cantidad") 
      console.log(req.body.cantBody[i] + " es la cantidad")

     // console.log(items[i].invoiceR.id + ": es el id el id de INVOICE") 
      console.log(req.body.idInvoice[i]+ ": es el id el id de INVOICE")

      //console.log(items[i].idPCP.id + ": es el id Product-color-product") 
      console.log(req.body.idPCPBody[i] + ": es el id Product-color-product")

      //console.log(items[i].idPCP.quantity + ": es cantidad stock de product-color-product") 
      console.log(req.body.cantBody[i]+ ": es cantidad stock de product-color-product")
    }
    
    //return res.json(req.body)
    //res.send("body es "+ req.body)
    // crea item de remito 
    for (i = 0; i< req.params.cantidad ; i++) {
      console.log("en for para actualizar tablas " + i )
    let nuevoItem = {
      number:0,
      id_prod_color_prod: parseInt(req.body.idPCPBody[i]),
      id_product: parseInt(req.body.idProduct[i]),
      id_color:parseInt(req.body.idColor[i]),
      // deposit es uno solo
      id_deposit : parseInt(req.body.idDeposito),
      id_invoice: parseInt(req.body.idInvoice[i]),
      id_invoiceItem: parseInt(req.body.idItemBody[i]),
      quantity : parseInt(req.body.cantBody[i]),
      zona:1
     }
     //return res.json(nuevoItem)
      let remitoItem = await db.UserRemit.create(nuevoItem);
      // actualizo otras tablas
      console.log("actualiz?? UserREmit")
      let cantProdColorProd = parseInt(req.body.cantPCPBody[i]) - parseInt(req.body.cantBody[i]);
      console.log(cantProdColorProd)
     
      let actualizaPCP = await db.ProductColorProduct.update({
        quantity : cantProdColorProd,
      },{
        where:{
          id:req.body.idPCPBody[i]
        },
      } );
      // trata stock del dep??sito elegido- si no existe lo deja en negativo y crea
      let buscaDepProduct = await db.DepositProduct.findOne({
        where: {
          id: req.body.idDeposito,
          id_prod_color_prod : req.body.idPCPBody[i]
        }
      });
      let cantidad = 0 ;
      let fecha = new Date();
      if (buscaDepProduct){
        cantidad = parseInt(buscaDepProduct.quantity);
        cantidad = cantidad - parseInt(req.body.cantBody[i]);      
        let actualizaDepProd = await db.DepositProduct.update({
          quantity: cantidad,
          date_new: fecha
        },{
          where:{
            id: req.body.idDeposito,
            id_prod_color_prod : req.body.idPCPBody[i]
        }
        });
      } else{
        cantidad = (-1)*parseInt(req.body.cantBody[i]);
        let generaProd = await db.DepositProduct.create({
          id_prod_color_prod:req.body.idPCPBody[i],
          id_deposit: req.body.idDeposito,
          quantity : cantidad,
          date_new: fecha
        })
      }
      // cuando genere remito total atualizar invoice Item con id_invoice
    } // del for   
    // termina tema nro de remito
    res.render("mensajeCreaRto", { user:userHead , facturaNro: req.body.madeBody})  
},
faltaRtoTotal: async (req,res)=> {
  let userHead= invitado(req.session.usuario);

  let itemRemit= await db.UserRemit.findAll({
    order : [["id_invoice","ASC"] ],
    where:{
      number:0
    },
      include:["usRInvoice"]  
  });
 // return res.json(itemRemit)
  if(itemRemit.length = 0){
    let mensaje = "no hay remitos a generar ";
    res.render("mensajesDB",{user:userHead, mensaje:mensaje});
  } else{

    let arrayFact = [];
    let listado = {
      invoice_id:0,
      invoice_number:0,
      direccion: "",
      horario: "",
    } 
    // porque puede habe muchos remitos User que pertenecen a disntitnas facturas y otras a la misma  
    primero: itemRemit[0].id_invoice;
    for (i=0 ; i< itemRemit.length ;i++){
      if (itemRemit[i].id_invoice !== primero || (i== 0)){
        listado ={
          invoice_id: itemRemit[i].id_invoice,
          invoice_number: itemRemit[i].usRInvoice.number,
          direccion: itemRemit[i].usRInvoice.delivery_dir,
          horario: itemRemit[i].usRInvoice.horary
        }       
        arrayFact.push(listado);
        primero= itemRemit[i].id_invoice
      }
    }
    let mensaje = "GENERACI??N REMITO A CLIENTE ";
    let mensaje2 = "FACTURA INTERNA :"+ itemRemit[0].usRInvoice.number
    res.render("listGeneraRto",{user:userHead, array:arrayFact, mensaje:mensaje, mensaje2:mensaje2});
  }
},
creaRtoTotal : async (req,res) =>{
  let userHead= invitado(req.session.usuario);
  // nro de remito nuevo
  let facturacion = productModel.find(0);
  let numberRto = facturacion.remit;
  
  //
  let rtoCrea ={
    number : numberRto,
    id_invoice: req.params.id,
    zona:1
  }
  let remitoTotal = await db.UserRemitTotal.create(rtoCrea);
  console.log(remitoTotal.id)
  await db.userRemit.update({
    number : numberRto,
    where:{
      id_invoice: req.params.id
    }
  });
  //
  let facturaData = {
    id: 0,
    numero: facturacion.numero,
    remito:facturacion.remito + 1,
    senialRemito:senialRemito,
    standard: facturacion.standard,
    premiun: facturacion.premiun
  }
  productModel.update(facturaData);
  let mensaje = "REMITO :" + numberRto + "ha sido creado";
  res.render("mensajesDB",{user:userHead, mensaje:mensaje})

},

ingresaRtoProveedor: (req,res) =>{
  let userHead= invitado(req.session.usuario);

  let productoColor = db.ProductColorProduct.findAll({
    include :["pcpProduct","pcpColor"],
    order:[["id_product","DESC"]]
  });
  //return res.json(productoColor)
  let proveedor = db.Supplier.findAll();
  let deposito = db.Deposit.findAll();
  let fecha = new Date();
  let fechaV= fecha.toLocaleDateString();
  Promise.all([productoColor, proveedor, deposito]).then(function ([
    productColorProducts,
    suppliers,
    deposits,   
  ]) {
    //return res.json(productColorProducts)
    return res.render("altaRemitoSupp", {
      productoColor: productColorProducts,
      proveedor: suppliers,
      deposito: deposits,
      fechaV:fechaV,     
      user:userHead,
    });
  }); 
},
altaRtoProveedor: async (req,res) =>{
  let userHead= invitado(req.session.usuario);
  const errors = validationResult(req);
//return res.json(req.body)
let fecha = new Date();
  let cantidades= req.body.cantBody.filter(element =>element > 0 );

  //return res.json(cantidades)
    if (errors.errors.length > 0 || ! (cantidades) || ! (req.body.prodColorBody)){
      //return res.json(req.prodColorBody)
      console.log("en en errores :" + errors.errors.length)
      console.log(cantidades)
      //return res.json(req.body.prodColorBody)
      let productoColor = await db.ProductColorProduct.findAll({
        include :["pcpProduct","pcpColor"],
        order:[["id_product","DESC"]]
      });
      let proveedor = await db.Supplier.findAll();
      let deposito = await db.Deposit.findAll();
      
      let fechaV= fecha.toLocaleDateString(); 
      //return res.json(errors.mapped())
      res.render("altaRemitoSupp", {
        errorsProd: errors.mapped(),
        productoColor: productoColor,
        proveedor: proveedor,
        deposito: deposito,
        fechaV:fechaV,     
        user:userHead
      } )
    } // del validation hay error
    else{
      console.log("el dep??sito es = " + req.body.deposito)
      // doy alta REMITO TOTAL SUPP
      let proveedorTabla= {
        id_supplier : req.body.proveedor,
        id_deposit: req.body.deposito,
        number: req.body.remito,
        date_recepction: req.body.fechaRec,
        dniReception: req.body.dni,
        comentaries: req.body.comentario + req.body.comentario2
      }
      //return res.json(proveedorTabla)
      let supp = await db.SupplierRemit.create(proveedorTabla);
      // ahora actualizo stock y creo item Remito
      let item ={
        id_prod_color_prod : 0,
        id_product :0,
        id_color:0,
       
        id_supplier:0,
        number:0,
        quantity:0,
        
      }
      let itemSup="";
      let stock ="";
      let actualizaStock="";
      let stockDeposito =0;
      let actualizaDP="";  
      let itemProdDep ={
        quantity: 0,
        date_new : "",
        id_deposit :0,
        id_prod_color_prod : 0
      }
      ///
     
      for (i=0 ; i< cantidades.length ; i++){
        console.log("est?? en el for cantidades con i = "+i)
        console.log(req.body.prodColorBody[i]+ "  es clave prodColor")
        stock = await db.ProductColorProduct.findOne({
          where:{
            id:req.body.prodColorBody[i]
          }
        })
        console.log(req.body.prodColorBody[i])
        //return res.json(req.body.deposito)
        if (stock){
          resultado = parseInt(stock.quantity) + parseInt(cantidades[i]);       
       // if (req.body.prodColorBody[i] !== undefined){
           item ={
            id_prod_color_prod : req.body.prodColorBody[i],
            id_product :stock.id_product,
            id_color:stock.id_color,
            id_supplier:req.body.proveedor,
            number:req.body.remito,
            quantity:cantidades[i],
            id_deposit: req.body.deposito
          };
          itemSup = await db.SupplierRemitItem.create(item);
          actualizaStock = await db.ProductColorProduct.update({
            quantity : resultado,
            dispach: req.body.remito
          }, {
            where:{
              id:req.body.prodColorBody[i]
            }
          })
          // return res.json(stock)
          // ojo ac?? porque el i no es lo mismo ver en req.body   
            let productoDeposito = await db.DepositProduct.findOne({
              where:{
                id_prod_color_prod : req.body.prodColorBody[i]
              }
            });  
            if(productoDeposito){
              stockPDeposito =  parseInt( productoDeposito.quantity) + parseInt(cantidades[i]);
                actualizaDP = await db.DepositProduct.update({
                quantity : stockDeposito, 
                date_new : fecha
                },{
                where:{
                  id : req.body.deposito
                }
               })
            }
            else { // de if productDeposito
                itemProdDep ={
                quantity: cantidades[i],
                date_new : fecha,
                id_deposit : req.body.deposito,
                id_prod_color_prod : req.body.prodColorBody[i]
              }
               actualizaDP= await db.DepositProduct.create(itemProdDep);
               
            } // de else de depositProduct  
          } // del if stock
       
          else{
            let mensaje = "error en sistemas 223";
            let productoNo = req.body.proBody[i];
            let productoNo2= req.body.colorBody[i];
            res.render("mensajesEXP", {user:userHead ,mensaje:mensaje, productoNo:productoNo, productoNo2: productoNo2 })
          } // final del else ir req.body.
       
      } // del for
      
    } // del else de errores 
            let mensaje = "Se ha creado remito de Proveedor ";
            let productoNo = "se actualizaron stocks"
            let productoNo2= "";
            res.render("mensajesEXP", {user:userHead ,mensaje:mensaje, productoNo:productoNo, productoNo2: productoNo2 })
}
}
  module.exports = controller;
