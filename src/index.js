const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/clients.routes'));
app.use('/api', require('./routes/products.routes'));

app.get('/', (req, res) => {
  res.send('O troço rodou! Use o postman para testar as rotas');
});

app.listen(port, () => {
  console.log(`Server está rodando na porta ${port}`);
});
