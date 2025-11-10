const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://caioitacare8_db_user:6X7V3n0LDdB4ZtZd@cluster0.p9ciqdm.mongodb.net/menu_app?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB conectado!');
    } catch (err) {
        console.error('Erro de conexão:', err.message);
        process.exit(1);
    }
};

const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: String,
    preco: { type: Number, required: true },
    categoria: { type: String, required: true }
});

const PedidoSchema = new mongoose.Schema({
    cliente: { type: String, required: true },
    tipoConsumo: { type: String, enum: ['local', 'leve'], required: true },
    itens: [ /* ... */ ],
    total: { type: Number, required: true },
    data: { type: Date, default: Date.now },
    status: { type: String, default: 'Recebido' }
}, { strict: false });

const Produto = mongoose.model('Produto', ProdutoSchema);
const Pedido = mongoose.model('Pedido', PedidoSchema);

module.exports = { connectDB, Produto, Pedido };