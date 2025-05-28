select * from usuario;

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

INSERT INTO console_favorito (idConsole, nome, geracao) VALUES
(0, 'Nenhum', 'Nenhuma');

INSERT INTO console_favorito (idConsole, nome, geracao) VALUES
(1, 'Magnavox Odyssey', '1ª Geração (década de 1970)'),
(2, 'Atari 2600', '2ª Geração'),
(3, 'Intellivision', '2ª Geração'),
(4, 'ColecoVision', '2ª Geração'),
(5, 'Nintendo Entertainment System (NES)', '3ª Geração'),
(6, 'Sega Master System', '3ª Geração'),
(7, 'Super Nintendo Entertainment System (SNES)', '4ª Geração'),
(8, 'Sega Genesis (Mega Drive)', '4ª Geração'),
(9, 'Neo Geo', '4ª Geração'),
(10, 'Sony PlayStation', '5ª Geração'),
(11, 'Nintendo 64', '5ª Geração'),
(12, 'Sega Saturn', '5ª Geração'),
(13, 'Sony PlayStation 2', '6ª Geração'),
(14, 'Microsoft Xbox', '6ª Geração'),
(15, 'Nintendo GameCube', '6ª Geração'),
(16, 'Sega Dreamcast', '6ª Geração'),
(17, 'Sony PlayStation 3', '7ª Geração'),
(18, 'Microsoft Xbox 360', '7ª Geração'),
(19, 'Nintendo Wii', '7ª Geração'),
(20, 'Sony PlayStation 4', '8ª Geração'),
(21, 'Microsoft Xbox One', '8ª Geração'),
(22, 'Nintendo Switch', '8ª Geração'),
(23, 'Sony PlayStation 5', '9ª Geração (atual)'),
(24, 'Microsoft Xbox Series X/S', '9ª Geração (atual)');


CREATE TABLE genero (
    idGenero INT PRIMARY KEY,
    nome VARCHAR(100)
);

INSERT INTO genero (idGenero, nome) VALUES
(0, 'Nenhum'),
(1, 'Plataforma'),
(2, 'Hack and Slash'),
(3, 'Beat \'em up'),
(4, 'Run and Gun'),

(5, 'Aventura de Ação'),
(6, 'Point and Click'),
(7, 'Metroidvania'),
(8, 'Survival'),

(9, 'RPG de Turno'),
(10, 'RPG de Ação'),
(11, 'JRPG'),
(12, 'Roguelike / Roguelite'),
(13, 'MMORPG'),

(14, 'RTS (Tempo Real)'),
(15, 'Tático por Turno'),
(16, 'Defesa de Torre'),
(17, '4X (Exploração, Expansão, Exploração, Extermínio)'),

(18, 'Simulação de Vida'),
(19, 'Simulação de Construção e Gestão'),
(20, 'Simulação de Voo'),
(21, 'Simulador Realista'),

(22, 'Futebol'),
(23, 'Basquete'),
(24, 'Corrida Arcade'),
(25, 'Simulação de Corrida'),

(26, 'FPS (First-Person Shooter)'),
(27, 'TPS (Third-Person Shooter)'),
(28, 'Shoot \'em up'),
(29, 'Battle Royale'),

(30, 'Puzzle'),
(31, 'Party Game'),
(32, 'Match-3'),
(33, 'Quebra-cabeça Lógico'),

(34, 'Ritmo'),
(35, 'Karaokê'),
(36, 'Dança'),

(37, 'Visual Novel'),
(38, 'Sandbox'),
(39, 'Educacional'),
(40, 'Idle / Incremental');


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
    fkConsoleFavorito INT DEFAULT 0,
    fkGeneroFavorito INT DEFAULT 0,
    FOREIGN KEY (fkJogoFavorito) REFERENCES jogo_favorito(idJogo),
    FOREIGN KEY (fkConsoleFavorito) REFERENCES console_favorito(idConsole),
    FOREIGN KEY (fkGeneroFavorito) REFERENCES genero(idGenero)
);

INSERT INTO usuario (nome, email, senha, fkConsoleFavorito, fkGeneroFavorito)
VALUES
('Alice Souza', 'alice@example.com', 'senha123', 5, 1),
('Bruno Lima', 'bruno@example.com', 'senha123', 7, 9),
('Carlos Mendes', 'carlos@example.com', 'senha123', 10, 26),
('Daniela Rocha', 'daniela@example.com', 'senha123', 22, 5),
('Eduardo Pires', 'eduardo@example.com', 'senha123', 14, 27),
('Fernanda Dias', 'fernanda@example.com', 'senha123', 6, 3),
('Gustavo Almeida', 'gustavo@example.com', 'senha123', 1, 4),
('Helena Castro', 'helena@example.com', 'senha123', 13, 11),
('Igor Nunes', 'igor@example.com', 'senha123', 20, 30),
('Juliana Martins', 'juliana@example.com', 'senha123', 23, 34),
('Karen Silva', 'karen@example.com', 'senha123', 8, 2),
('Leonardo Reis', 'leonardo@example.com', 'senha123', 2, 10),
('Mariana Lopes', 'mariana@example.com', 'senha123', 19, 18),
('Nicolas Vieira', 'nicolas@example.com', 'senha123', 18, 12),
('Olivia Fernandes', 'olivia@example.com', 'senha123', 9, 6),
('Paulo Cardoso', 'paulo@example.com', 'senha123', 21, 15),
('Quésia Tavares', 'quesia@example.com', 'senha123', 11, 28),
('Rafael Brito', 'rafael@example.com', 'senha123', 3, 14),
('Sabrina Moura', 'sabrina@example.com', 'senha123', 4, 33),
('Tiago Faria', 'tiago@example.com', 'senha123', 24, 29);

select * from usuario;
select * from genero;
select * from console_favorito;
truncate usuario;