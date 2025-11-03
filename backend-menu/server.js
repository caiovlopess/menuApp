const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());

const produtos = [
    { id: 1, nome: "X-Burger", descricao: "Hambúrguer, queijo, salada", preco: 15.90, categoria: "Lanches" },
    { id: 2, nome: "Batata Frita Média", descricao: "Porção de batata frita", preco: 8.50, categoria: "Acompanhamentos" },
    { id: 3, nome: "Coca-Cola Lata", descricao: "Refrigerante 350ml", preco: 5.00, categoria: "Bebidas" },
    { id: 4, nome: "Milkshake de Chocolate", descricao: "Milkshake cremoso", preco: 12.00, categoria: "Sobremesas" },
    { id: 5, nome: "X-Salada", descricao: "Hambúrguer, queijo, presunto, salada", preco: 17.90, categoria: "Lanches" },
];

let pedidos = []; 

//rotas da api

app.get('/api/produtos', (req, res) => {
    console.log('Requisição GET /api/produtos recebida.');
    setTimeout(() => {
        res.status(200).json(produtos);
    }, 500);
});

app.post('/api/pedidos', (req, res) => {
    const novoPedido = req.body;

    if (!novoPedido || !novoPedido.itens || novoPedido.itens.length === 0) {
        return res.status(400).json({ mensagem: 'O pedido deve conter itens.' });
    }

    const idPedido = pedidos.length + 1;
    const pedidoSalvo = {
        id: idPedido,
        ...novoPedido,
        data: new Date().toISOString(),
        status: 'Recebido'
    };

    pedidos.push(pedidoSalvo);

    console.log(`Novo pedido recebido: ID ${idPedido}, Total: R$ ${novoPedido.total.toFixed(2)}`);
    res.status(201).json({
        mensagem: 'Pedido recebido com sucesso!',
        idPedido: idPedido,
        status: 'Recebido'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}` );
});
