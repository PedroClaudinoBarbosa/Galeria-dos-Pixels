var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/dashboardController");

router.get("/geracao", function (req, res) {
    medidaController.buscarGeracao(req, res);
});

router.get("/topconsoles", function (req, res) {
    medidaController.buscarTopConsoles(req, res);
});

router.get("/generospopulares", function (req, res) {
    medidaController.buscarTopGeneros(req, res);
});

router.get("/obterDadosJogosFavoritos", function (req, res) {
    medidaController.obterDadosJogosFavoritos(req, res);
});

router.get("/atualizarSelects", function (req, res) {
    medidaController.atualizarSelects(req, res);
});

module.exports = router;