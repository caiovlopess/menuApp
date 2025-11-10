import { Component, OnInit } from '@angular/core';
import { MenuService, Produto } from '../services/menu.services';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { FinalizarPedidoModal } from '../modals/finalizar-pedido/finalizar-pedido.page';

interface ItemCarrinho extends Produto {
  quantidade: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  produtos: Produto[] = [];
  carregando = true;
  carrinho: ItemCarrinho[] = [];
  totalCarrinho = 0;

  constructor(
    private menuService: MenuService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  async abrirCarrinho() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      componentProps: { carrinho: this.carrinho, total: this.totalCarrinho }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data?.removed) {
      this.carrinho = data.novoCarrinho;
      this.totalCarrinho = data.novoTotal;
    }
  }

  async abrirModalFinalizar() {
    if (this.carrinho.length === 0) return;

    const modal = await this.modalCtrl.create({
      component: FinalizarPedidoModal,
      componentProps: {
        total: this.totalCarrinho,
        carrinho: this.carrinho
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      this.enviarPedidoComDados(data);
    }
  }

  private enviarPedidoComDados(dados: { nomeCliente: string; tipoConsumo: 'local' | 'leve' }) {
    const pedidoParaAPI = {
      cliente: dados.nomeCliente,
      tipoConsumo: dados.tipoConsumo,
      itens: this.carrinho.map(item => ({
        produtoId: item._id,
        nome: item.nome,
        quantidade: item.quantidade,
        preco: item.preco
      })),
      total: this.totalCarrinho
    };

    this.menuService.enviarPedido(pedidoParaAPI).subscribe({
      next: (response) => {
        this.carrinho = [];
        this.totalCarrinho = 0;
        alert(`Pedido de ${dados.nomeCliente} (${dados.tipoConsumo === 'local' ? 'comer aqui' : 'levar'}) enviado!`);
      },
      error: (err) => {
        console.error('Erro ao enviar pedido:', err);
        alert('Erro ao enviar pedido');
      }
    });
  }

  carregarProdutos() {
    this.menuService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.carregando = false;
      }
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    const itemExistente = this.carrinho.find(i => i._id === produto._id);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      this.carrinho.push({ ...produto, quantidade: 1 });
    }
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalCarrinho = this.carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  removerDoCarrinho(produtoId: any) {
    const index = this.carrinho.findIndex(i => i._id === produtoId);
    if (index > -1) {
      this.carrinho.splice(index, 1);
      this.calcularTotal();
    }
  }
}