var express = require('express');
var router = express.Router();
const authMiddle = require("../middlewares/authMiddle.js");

const {body, check} = require('express-validator')
const validatorExpedition = require("../validator/validatorExpedition"); 
const validatorSOLOProduct = require("../validator/validatorSOLOProduct");
const bExpeditionController = require("../controllers/bExpeditionController")

router.get("/listarProdColorProd",bExpeditionController.listarProdColorProd)
router.get("/opcionesE",bExpeditionController.enlaces)
// altas deposito y proveedor
router.get("/altaDeposito",bExpeditionController.altaDeposito)
router.put("/creaDeposito",validatorExpedition.altaDeposito,bExpeditionController.creaDeposito)
router.get("/altaProveedor",bExpeditionController.altaProveedor)
router.put("/creaProveedor",validatorExpedition.altaProveedor,bExpeditionController.creaProveedor)
// REMITOS DE USUARIOS 
router.get("/listVtasPending",bExpeditionController.listVtasPending)
router.get("/itemFactura/:id",bExpeditionController.listItemsPending)
router.post("/creaItemRemitoUser/:cantidad",bExpeditionController.creaItemRemitoUser)
router.get("/listRtosGeneral",bExpeditionController.faltaRtoTotal)
router.post("/creaRtoTOTAL/:id",bExpeditionController.creaRtoTotal)
// REMITOS PROVEEDOR PARA DAR STOCK
router.get("/ingresarRemitoProveedor",bExpeditionController.ingresaRtoProveedor)
router.post("/altaRemitoProveedor",bExpeditionController.altaRemitoProveedor)
module.exports = router;
