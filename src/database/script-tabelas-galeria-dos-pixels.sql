CREATE USER 'galeria'@'localhost' IDENTIFIED BY 'pixels1996';
GRANT ALL PRIVILEGES ON *.* TO 'galeria'@'localhost';
FLUSH PRIVILEGES;

create database if not exists galeria_dos_pixels;
use galeria_dos_pixels;

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
    idUsuario INT PRIMARY KEY auto_increment,
    nome VARCHAR(200),
    email VARCHAR(200) unique,
    senha VARCHAR(100),
    fkJogoFavorito INT,
    fkConsoleFavorito INT,
    fkGeneroFavorito INT,
    FOREIGN KEY (fkJogoFavorito) REFERENCES jogo_favorito(idJogo),
    FOREIGN KEY (fkConsoleFavorito) REFERENCES console_favorito(idConsole),
    FOREIGN KEY (fkGeneroFavorito) REFERENCES genero(idGenero)
);

select * from usuario;
truncate usuario;