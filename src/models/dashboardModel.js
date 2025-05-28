var database = require("../database/config");

function buscarGeracaoConsoles() {

    var instrucaoSql = `
    SELECT c.geracao AS geracao_console,
        COUNT(*) AS quantidade_usuarios
    FROM 
        usuario
    JOIN 
        console_favorito c ON usuario.fkConsoleFavorito = c.idConsole
    GROUP BY 
        c.geracao
    ORDER BY 
        c.geracao;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTopConsoles() {

    var instrucaoSql = `
    SELECT 
        c.nome AS nome_console,
        COUNT(u.fkConsoleFavorito) AS votos
    FROM 
        usuario u
    JOIN 
        console_favorito c ON u.fkConsoleFavorito = c.idConsole
    WHERE c.nome <> 'Nenhum'
    GROUP BY 
        c.idConsole, c.nome
    ORDER BY 
        votos DESC
    LIMIT 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTopGeneros() {

    var instrucaoSql = `
    SELECT 
        g.nome AS nome_genero,
        COUNT(u.fkGeneroFavorito) AS votos
    FROM 
        usuario u
    JOIN 
        genero g ON u.fkGeneroFavorito = g.idGenero
    WHERE 
        g.nome <> 'Nenhum'
    GROUP BY 
        g.idGenero, g.nome
    ORDER BY 
        votos DESC
    LIMIT 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarGeracaoConsoles,
    buscarTopConsoles,
    buscarTopGeneros
}
