var medidaModel = require("../models/dashboardModel");

function buscarGeracao(req, res) {


    medidaModel.buscarGeracaoConsoles().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarTopConsoles(req, res) {


    medidaModel.buscarTopConsoles().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro os tops consoles.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarTopGeneros(req, res) {


    medidaModel.buscarTopGeneros().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os tops generos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarGeracao,
    buscarTopConsoles,
    buscarTopGeneros
}