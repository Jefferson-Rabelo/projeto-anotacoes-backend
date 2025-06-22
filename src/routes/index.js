const express = require('express');
const UserController = require('../controllers/UserController');
const NoteController = require('../controllers/NoteController');
const authMiddleware = require('../middlewares/auth');

const routes = express.Router();

// Rotas públicas
routes.post('/register', UserController.register);
routes.post('/login', UserController.login);

// Rotas protegidas
routes.use(authMiddleware);

routes.post('/notes', NoteController.create);
routes.get('/notes', NoteController.list);
routes.put('/notes/:id', NoteController.update);
routes.delete('/notes/:id', NoteController.delete);

module.exports = routes;
