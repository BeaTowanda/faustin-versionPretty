const express = require("express");
const router = express.Router(); 

const authMiddle = require("../middlewares/authMiddle.js");

const multer = require("multer")
const bproductController = require("../controllers/bproductController")
const {body, check} = require('express-validator')
const validatorPDB = require("../validator/validatorProductDb"); 
const validatorSOLOProduct = require("../validator/validatorSOLOProduct");

router.get('/buscarPorBarra',bproductController.search);
router.get('/opciones',authMiddle,bproductController.enlaces);
router.get('/verApi',authMiddle,bproductController.armarApi);
// TIPO DE PRODUCTO

router.get("/altaType",bproductController.altaType);
router.put("/creaType",validatorPDB.altaType,bproductController.creaType)
router.get("/listType",bproductController.listType);
router.get("/deleteType/:id",bproductController.deleteType)
// AÑO PRODUCTO
router.get("/altaYear",bproductController.altaYear);
router.put("/creaYear",validatorPDB.altaYear,bproductController.creaYear)
router.get("/listYear",bproductController.listYear);
router.get("/deleteYear/:id",bproductController.deleteYear)
// COLECCIÓN PRODUCTO
router.get("/altaColection",bproductController.altaColection);
router.put("/creaColection",validatorPDB.altaColection,bproductController.creaColection)
router.get("/listColection",bproductController.listColection);
router.get("/deleteColection/:id",bproductController.deleteColection);
// TABLA COLORES . cARGA EL LINK A ARCHIVO json 
router.get("/altaColor",bproductController.altaColor);
router.put("/creaColor",validatorPDB.altaColor,bproductController.creaColor)
router.get("/listColor",bproductController.listColor);
router.get("/deleteColor/:id",bproductController.deleteColor);
// TABLA PRODUCTOS 
router.get("/altaProduct",bproductController.altaProduct);
router.put("/creaProduct",validatorSOLOProduct.altaProducto,bproductController.creaProduct)
//LISTAR Y ACTUALIZAR PRODUCTO
router.get("/listProduct",bproductController.listarProduct);
router.get("/detailOneDB/:id",bproductController.detailOneDB)
router.post("/updateOneDB/:id",validatorSOLOProduct.updateProducto,bproductController.storeUpdate)
router.get("/listVisitados",bproductController.visitados)
// eliminar producto
router.get("/irBajaProduct",bproductController.irBajaProduct)
router.get("/bajaProducto/:id",bproductController.bajaProducto)
router.post("/bajaProducto/:id", bproductController.storeDelete)
// cargar cantidades de producto-color
router.get("/listRtos",bproductController.listarProductosRemito)
router.get("/remitos/:id", bproductController.cargaRemitos)
//no valida remitos porque es opcional
router.post("/remitos/:id",bproductController.storeRemitos)
// armo esta ruta para probar el json
router.get("/probar",bproductController.probar)
router.get("/listarProdType/:id",bproductController.prodPorType)
// proceso de compra 
router.get("/detalle/:id",authMiddle,bproductController.detail)
router.post("/compra/:id",authMiddle,validatorPDB.detalleCompra,bproductController.comprar)
router.post("/cierraCompra/:suma",authMiddle,validatorPDB.finCompra,bproductController.finComprar)
//
router.get("/carritoHome",authMiddle,bproductController.homeCarrito)

//router.post("/registraCompra/:suma",authMiddle,validatorSOLOProduct.finCompra,bproductController.creaFactura)
router.post("/registraCompra/:suma",authMiddle,bproductController.creaFactura)
router.post("/endCarrito",authMiddle,bproductController.endCompra)
router.get("/cancelaCarrito",authMiddle,bproductController.borraCarrito)
// impuestos
router.get("/taxes",bproductController.altaTaxes)
router.put("/taxes",validatorSOLOProduct.validaTax,bproductController.storeTaxes)
// MUESTRA OFERTAS SEMANALES
router.get("/ofertas",bproductController.mostrarOfertas)
// ACTUALIZAR / ALTA OFERTAS SEMANALES 
router.get("/updateOfertas",bproductController.updateOfertas)
router.put("/updateofertas",validatorSOLOProduct.validaSale,bproductController.storeOfertas)



module.exports = router