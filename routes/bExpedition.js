var express = require('express');
var router = express.Router();
const authMiddle = require("../middlewares/authMiddle.js");

const {body, check} = require('express-validator')
const validatorExpedition = require("../validator/validatorExpedition"); 
const validatorSOLOProduct = require("../validator/validatorSOLOProduct");
const bExpeditionController = require("../controllers/bExpeditionController")

router.get("/listarProdColorProd",bExpeditionController.listarProdColorProd)
router.get("/opciones",bExpeditionController.enlaces)
// altas deposito y proveedor
router.get("/altaDeposito",bExpeditionController.altaDeposito)
router.put("/creaDeposito",validatorExpedition.altaDeposito,bExpeditionController.creaDeposito)
router.get("/altaProveedor",bExpeditionController.altaProveedor)
router.put("/creaProveedor",validatorExpedition.altaProveedor,bExpeditionController.creaProveedor)
module.exports = router;
