const express = require('express');
const cors = require('cors');
const { connectDB, Produto, Pedido } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.route('/api/produtos')
    .get(async (req, res) => {
        try {
            res.json(await Produto.find());
        } catch (err) {
            res.status(500).json({ mensagem: 'Erro ao buscar produtos' });
        }
    })
    .post(async (req, res) => {
        try {
            const novoProduto = new Produto(req.body);
            res.status(201).json(await novoProduto.save());
        } catch (err) {
            res.status(400).json({ mensagem: 'Dados inválidos para criar produto' });
        }
    });

app.route('/api/produtos/:id')
    .get(async (req, res) => {
        try {
            const produto = await Produto.findById(req.params.id);
            produto ? res.json(produto) : res.status(404).json({ mensagem: 'Produto não encontrado' });
        } catch (err) {
            res.status(500).json({ mensagem: 'Erro ao buscar produto' });
        }
    })
    .put(async (req, res) => {
        try {
            const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
            produto ? res.json(produto) : res.status(404).json({ mensagem: 'Produto não encontrado' });
        } catch (err) {
            res.status(400).json({ mensagem: 'Erro ao atualizar produto' });
        }
    })
    .delete(async (req, res) => {
        try {
            const produto = await Produto.findByIdAndDelete(req.params.id);
            produto ? res.status(200).json({ mensagem: 'Produto deletado com sucesso' }) : res.status(404).json({ mensagem: 'Produto não encontrado' });
        } catch (err) {
            res.status(500).json({ mensagem: 'Erro ao deletar produto' });
        }
    });

app.post('/api/pedidos', async (req, res) => {
    try {
        const novoPedido = new Pedido(req.body);
        const pedidoSalvo = await novoPedido.save();
        res.status(201).json({ mensagem: 'Pedido recebido com sucesso!', idPedido: pedidoSalvo._id });
    } catch (err) {
        res.status(400).json({ mensagem: 'Erro ao processar pedido' });
    }
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor rodando em http://localhost:${PORT} e pronto para requisições.` );
        });
    } catch (err) {
        console.error("Falha ao iniciar o servidor:", err);
    }
};

startServer();
