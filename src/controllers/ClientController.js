const pool = require('../config/db');

const ClientController = {
  createClient: async (req, res) => {
    const { name, email, cpf, contact } = req.body;
    try {
      const newClient = await pool.query(
        'INSERT INTO clients (name, email, cpf, contact) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, cpf, contact]
      );
      res.json(newClient.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  },
};

module.exports = ClientController;
