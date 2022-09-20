const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send ({
        mensagem: 'Todos os produtos!'
    });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES(?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(201).send ({
                    mensagem: 'Produto inserido com sucesso!',
                    id_produto: resultado.insertId
                });
            }
        )
    })
});

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    if(id == "unico"){
        res.status(200).send({
            mensagem: 'GET com um produto único!',
            id: id
        });

    } else {
        res.status(200).send({
            mensagem: 'Você passou um ID!'
        })
    }
});

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    res.status(201).send ({
        mensagem: 'Produto alterado!'
    });
});

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
    res.status(201).send ({
        mensagem: 'Produto excluído!'
    });
});

module.exports = router;