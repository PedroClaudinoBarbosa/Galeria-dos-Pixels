-- Tabelas
CREATE TABLE console_favorito (
    idConsole INT PRIMARY KEY,
    nome VARCHAR(100),
    geracao VARCHAR(100)
);

CREATE TABLE genero (
    idGenero INT PRIMARY KEY,
    nome VARCHAR(100)
);

CREATE TABLE jogo_favorito (
    idJogo INT PRIMARY KEY,
    nome VARCHAR(100),
    fkGenero INT,
    FOREIGN KEY (fkGenero) REFERENCES genero(idGenero)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY,
    nome VARCHAR(200),
    email VARCHAR(200),
    senha VARCHAR(100),
    fkJogoFavorito INT,
    fkConsoleFavorito INT,
    fkGeneroFavorito INT,
    FOREIGN KEY (fkJogoFavorito) REFERENCES jogo_favorito(idJogo),
    FOREIGN KEY (fkConsoleFavorito) REFERENCES console_favorito(idConsole),
    FOREIGN KEY (fkGeneroFavorito) REFERENCES genero(idGenero)
);

-- Inserts

-- Consoles
INSERT INTO console_favorito VALUES
(1, 'PlayStation 2', '6ª geração'),
(2, 'Xbox 360', '7ª geração'),
(3, 'Nintendo Switch', '8ª geração');

-- Gêneros
INSERT INTO genero VALUES
(1, 'RPG'),
(2, 'Ação'),
(3, 'Plataforma');

-- Jogos
INSERT INTO jogo_favorito VALUES
(1, 'The Witcher 3', 1),
(2, 'God of War', 2),
(3, 'Super Mario Odyssey', 3);

-- Usuários
INSERT INTO usuario VALUES
(1, 'Alice Souza', 'alice@email.com', 'senha123', 1, 1, 1),
(2, 'Bruno Lima', 'bruno@email.com', 'seguro456', 2, 2, 2),
(3, 'Carla Dias', 'carla@email.com', 'minhasenha', 3, 3, 3);

SELECT 
    u.nome AS usuario,
    j.nome AS jogo_favorito,
    c.nome AS console_favorito,
    g.nome AS genero_favorito
FROM usuario u
JOIN jogo_favorito j ON u.fkJogoFavorito = j.idJogo
JOIN console_favorito c ON u.fkConsoleFavorito = c.idConsole
JOIN genero g ON u.fkGeneroFavorito = g.idGenero;