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
};

module.exports = ProductController;
