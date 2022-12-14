const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('../mysql').pool;

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const res = require('express/lib/response');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', "PUT, POST, PACTH, DELETE, GET");
        return res.status(200).send({});
    }

    next();

});

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

app.use((rq, res, next) => {
    const erro = new Error('Não encontrado!');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
    erro: {
        mensagem: error.message
        }
    })
});

module.exports = app;