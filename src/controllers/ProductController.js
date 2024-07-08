const connection = require('../config/db');

const ProductController = {
  createProduct: async (req, res) => {
    const { name, amount, color, voltage, description, category_id, price } =
      req.body;
    try {
      const newProduct = await connection.query(
        'INSERT INTO products (name, amount, color, voltage, description, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, amount, color, voltage, description, category_id, price]
      );
      res.status(200).json(newProduct.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const allProducts = await connection.query('SELECT * FROM products');
      res.status(200).json(allProducts.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getProductDetails: async (req, res) => {
    const { id } = req.params;
    try {
      const productDetails = await connection.query(
        `SELECT products.*, categories.name as category_name 
         FROM products 
         JOIN categories ON products.category_id = categories.id 
         WHERE products.id = $1`,
        [id]
      );
      if (productDetails.rows.length === 0) {
        return res.status(404).send('Produto não encontrado');
      }
      res.json(productDetails.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = ProductController;
