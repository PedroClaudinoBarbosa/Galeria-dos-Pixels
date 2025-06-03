var opinioesModel = require("../models/opinioesModel");

function cadastrarConsole(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idConsole = req.body.console_idServer;
    var emailConsole = req.body.console_emailServer;

    // Faça as validações dos valores
    if (idConsole == undefined) {
        res.status(400).send("Seu console está undefined!");
    } else if (emailConsole == undefined){
        res.status(400).send("Seu email está undefined!");
    } 
    else {

        // Passe os valores como parâmetro e vá para o arquivo opinioesModel.js
        opinioesModel.cadastrarConsole(idConsole,emailConsole)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o update do Console! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarGenero(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idGenero = req.body.genero_idServer;
    var emailConsole = req.body.console_emailServer;

    // Faça as validações dos valores
    if (idGenero == undefined) {
        res.status(400).send("Seu genero está undefined!");
    } else if (emailConsole == undefined){
        res.status(400).send("Seu email está undefined!");
    } 
    else {

        // Passe os valores como parâmetro e vá para o arquivo opinioesModel.js
        opinioesModel.cadastrarGenero(idGenero,emailConsole)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o update do Console! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarJogoFavorito(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idJogoFavorito = req.body.console_jogoFavoritoServer;
    var idUsuario = req.body.console_idUsuarioServer;

    // Faça as validações dos valores
    if (idJogoFavorito == undefined) {
        res.status(400).send("Seu jogo está undefined!");
    } else if (idUsuario == undefined){
        res.status(400).send("Seu id está undefined!");
    } 
    else {

        // Passe os valores como parâmetro e vá para o arquivo opinioesModel.js
        opinioesModel.cadastrarJogoFavorito(idUsuario,idJogoFavorito)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o update do Console! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function removerJogoFavorito(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idJogoFavorito = req.body.console_jogoFavoritoServer;
    var idUsuario = req.body.console_idUsuarioServer;

    // Faça as validações dos valores
    if (idJogoFavorito == undefined) {
        res.status(400).send("Seu jogo está undefined!");
    } else if (idUsuario == undefined){
        res.status(400).send("Seu id está undefined!");
    } 
    else {

        // Passe os valores como parâmetro e vá para o arquivo opinioesModel.js
        opinioesModel.removerJogoFavorito(idUsuario,idJogoFavorito)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o update do Console! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    cadastrarConsole,
    cadastrarGenero,
    cadastrarJogoFavorito,
    removerJogoFavorito
}