const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

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

app.post('/tarefas', (req, res) => {
  const titulo = req.body?.titulo;
 
  if (!titulo) {
    return res.status(400).json({ erro: 'O campo "titulo" é obrigatório' });
  }
 
  const novaTarefa = { id: proximoId++, titulo, concluida: false };
  tarefas.push(novaTarefa);
 
  res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find((t) => t.id === id);
 
  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
 
  const { titulo, concluida } = req.body ?? {};
 
  if (!titulo) {
    return res.status(400).json({ erro: 'O campo "titulo" é obrigatório' });
  }
 
  tarefa.titulo = titulo;
  if (typeof concluida === 'boolean') {
    tarefa.concluida = concluida;
  }
 
  res.json(tarefa);
});

app.delete('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = tarefas.findIndex((t) => t.id === id);
 
  if (indice === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
 
  tarefas.splice(indice, 1);
  res.status(204).send();
});
 
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
