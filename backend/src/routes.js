const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //desacoplando o módulo de rotas do express em uma nova variável

routes.post('/sessions', SessionController.create);  //usa post pois mostra que tenho a intenção de criar uma sessão

routes.get('/ongs', OngController.index); //lista todas as ongs
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index); //lista casos específicos de uma ong

routes.get('/incidents', IncidentController.index); //lista todos os casos de todas as ongs
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes; //exportar uma variável de dentro de um arquivo