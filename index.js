const express = require('express');

const server = express();

server.use(express.json());

const Projects = [];

function countRequest(req, res, next) {
  console.count("Número de requisições");

  return next();
};

function checkId(req, res, next) {
  const { id } = req.params;
  const project = Projects.find(index => index.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Projeto não existe' });
  }

  return next();
}

server.use(countRequest);

server.get('/projects', (req, res) => {
  return res.json(Projects);
});

server.post('/projects', (req, res) => {
  const newProject = req.body;

  Projects.push(newProject);

  return res.json(Projects);
});

server.post('/projects/:id/tasks', checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const newTask = Projects.find(index => index.id == id);

  newTask.tasks.push(title)

  return res.json(Projects);
});

server.put('/projects/:id', checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const updateTitle = Projects.find(index => index.id == id);

  updateTitle.title = title;

  return res.json(Projects);
});

server.delete('/projects/:id', checkId, (req, res) => {
  const { id } = req.params;

  const deleteProject = Projects.findIndex(index => index.id == id);

  Projects.splice(deleteProject, 1);

  return res.status(200).json({ message: 'Projeto deletado com sucesso!' });
});

server.listen(3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});