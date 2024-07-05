const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('O troço rodou!');
});

app.listen(port, () => {
  console.log(`Server está rodando na porta ${port}`);
});
