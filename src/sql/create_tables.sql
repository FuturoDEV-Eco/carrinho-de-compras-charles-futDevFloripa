-- Criação da tabela categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

-- Inserção de categorias de exemplo
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

-- Criação da tabela clients
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    cpf VARCHAR(50) UNIQUE NOT NULL,
    contact VARCHAR(20) NOT NULL
);

-- Inserção de clientes de exemplo fonte 4dev.com.br
INSERT INTO clients (name, email, cpf, contact) VALUES
('Miguel Oliver César Carvalho', 'miguel_carvalho@unimedrio.com.br', '758.986.559-13', '(48) 98279-2332'),
('Caroline Yasmin Corte Real', 'caroline-cortereal95@care-br.com', '904.114.189-80', '(48) 2686-5731');

-- Criação da tabela products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    amount VARCHAR(150) UNIQUE DEFAULT '0',
    color VARCHAR(50),
    voltage VARCHAR(3) CHECK (voltage IN ('110', '220')),
    description TEXT,
    category_id INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    CONSTRAINT fk_category
      FOREIGN KEY(category_id) 
        REFERENCES categories(id)
);

-- Inserção de produtos de exemplo
INSERT INTO products (name, amount, color, voltage, description, category_id, price) VALUES
('Televisão', '10', 'Preto', '110', 'Televisão de 55 polegadas com resolução 4K.', 1, 2000.00),
('Geladeira', '5', 'Branco', '220', 'Geladeira com capacidade de 350 litros, sistema frost-free.', 2, 1500.00);

-- Criação da tabela orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL,
    total DECIMAL(10, 2),
    address TEXT,
    observations TEXT,
    CONSTRAINT fk_client
      FOREIGN KEY(client_id) 
      REFERENCES clients(id)
);

-- Criação da tabela orders_items
CREATE TABLE orders_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    price DECIMAL(10, 2),
    CONSTRAINT fk_order
      FOREIGN KEY(order_id) 
      REFERENCES orders(id),
    CONSTRAINT fk_product
      FOREIGN KEY(product_id) 
      REFERENCES products(id)
);
