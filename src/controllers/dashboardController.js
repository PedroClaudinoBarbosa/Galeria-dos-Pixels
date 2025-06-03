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

function obterDadosJogosFavoritos(req, res) {


    medidaModel.obterDadosJogosFavoritos().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os tops generos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarSelects(req, res) {
    // Obter o ID do usuário dos parâmetros da requisição
    var idUsuario = req.query.idUsuario;
    
    if (!idUsuario) {
        return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    medidaModel.atualizarSelects(idUsuario).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os jogos favoritos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarGeracao,
    buscarTopConsoles,
    buscarTopGeneros,
    obterDadosJogosFavoritos,
    atualizarSelects
}