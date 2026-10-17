const express = require('express');
const app = express();
const PORT = 3000;

// Persistência em memória
const tarefas = [
  { id: 1, titulo: 'Aprender Node', concluida: false },
  { id: 2, titulo: 'Criar uma API', concluida: false },
];
let proximoId = 3;
 
app.get('/', (req, res) => {
  res.send('Olá! Minha primeira API em Node.js está funcionando.');
});

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});
 
app.get('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find((t) => t.id === id);
 
  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
 
  res.json(tarefa);
});
 
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
