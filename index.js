const express = require('express');
const app = express();
const PORT = 3000;
 
app.get('/', (req, res) => {
  res.send('Olá! Minha primeira API em Node.js está funcionando.');
});
 
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
