const connection = require('../config/db');

const ProductController = {
  createProduct: async (req, res) => {
    const { name, amount, color, voltage, description, category_id } = req.body;
    try {
      const newProduct = await connection.query(
        'INSERT INTO products (name, amount, color, voltage, description, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, amount, color, voltage, description, category_id]
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
};

module.exports = ProductController;
