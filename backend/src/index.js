const express = require('express'); //para importar as funcionalidades. Importando a funcionalidade express para dentro da v ariável express
const cors = require('cors');
const routes = require('./routes'); //'./routes' Coloca o ./ pois é um arquivo e o arquivo está na mesma pasta. Voltar um pasta seria ../

const app = express(); //cria variável que vai armazenar a aplicação

app.use(cors());

app.use(express.json()); //precisa vir antes das rotas. 
/*Antes de todas as requisições o express vai lá no corpo da requisição e converter o JSON de lá em um objeto do javascript*/

app.use(routes);

app.listen(3333); //quando acessar localhost:3333 é para acessar a minha aplicação