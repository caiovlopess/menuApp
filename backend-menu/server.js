const express = require('express');
const cors = require('cors');
const { connectDB, Produto, Pedido } = require('./db');
const app = express();
const PORT = 3000;

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());

app.get('/api/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro ao buscar produtos', erro: err.message });
    }
});

app.post('/api/produtos', async (req, res) => {
    try {
        const novoProduto = new Produto(req.body);
        const produtoSalvo = await novoProduto.save();
        res.status(201).json(produtoSalvo);
    } catch (err) {
        res.status(400).json({ mensagem: 'Dados inválidos', erro: err.message });
    }
});

app.post('/api/pedidos', async (req, res) => {
    try {
        const novoPedido = new Pedido(req.body);
        const pedidoSalvo = await novoPedido.save();

        console.log(`Novo pedido recebido: ID ${pedidoSalvo._id}`);
        res.status(201).json({
            mensagem: 'Pedido recebido com sucesso!',
            idPedido: pedidoSalvo._id,
            status: pedidoSalvo.status
        });
    } catch (err) {
        res.status(400).json({ mensagem: 'Erro ao processar pedido', erro: err.message });
    }
});

connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
        console.log('Pronto para receber requisições do frontend Ionic.');
    });
}).catch(err => {
    console.error("Falha ao iniciar o servidor devido a erro no DB:", err);
});