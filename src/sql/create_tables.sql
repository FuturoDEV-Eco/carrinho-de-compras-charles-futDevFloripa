CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    cpf VARCHAR(50) UNIQUE NOT NULL,
    contact VARCHAR(20) NOT NULL
);


CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

INSERT INTO categories (name) VALUES 
('Eletrônicos'),
('Eletrodomésticos'),
('Livros'),
('Móveis'),
('Roupas'),
('Brinquedos'),
('Esportes'),
('Beleza'),
('Automotivo'),
('Alimentos');