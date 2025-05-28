var express = require("express");
var router = express.Router();

var opinioesController = require("../controllers/opinioesController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarConsole", function (req, res) {
    opinioesController.cadastrarConsole(req, res);
})

router.post("/cadastrarGenero", function (req, res) {
    opinioesController.cadastrarGenero(req, res);
})
module.exports = router;