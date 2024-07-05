const connection = require('../config/db');

const OrderController = {
  createOrder: async (req, res) => {
    const { client_id, address, observations, items } = req.body;
    try {
      // Calcular o total
      let total = 0;
      for (const item of items) {
        const product = await connection.query(
          'SELECT price FROM products WHERE id = $1',
          [item.product_id]
        );
        if (product.rows.length === 0) {
          return res
            .status(404)
            .send(`Produto com id ${item.product_id} não encontrado`);
        }
        total += product.rows[0].price * item.amount;
      }

      // Inserir a ordem
      const newOrder = await connection.query(
        'INSERT INTO orders (client_id, total, address, observations) VALUES ($1, $2, $3, $4) RETURNING *',
        [client_id, total, address, observations]
      );

      // Inserir os itens da ordem
      for (const item of items) {
        const product = await connection.query(
          'SELECT price FROM products WHERE id = $1',
          [item.product_id]
        );
        await connection.query(
          'INSERT INTO orders_items (order_id, product_id, amount, price) VALUES ($1, $2, $3, $4)',
          [
            newOrder.rows[0].id,
            item.product_id,
            item.amount,
            product.rows[0].price,
          ]
        );
      }

      res.json(newOrder.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = OrderController;
