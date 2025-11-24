// Arquivo: src/app/home/home.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterLink, ActivatedRoute } from '@angular/router';

import { MenuService, Produto } from '../services/menu.services';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { FinalizarPedidoModal } from '../modals/finalizar-pedido/finalizar-pedido.page';

// AQUI ESTÁ A CORREÇÃO: "extends Produto"
interface ItemCarrinho extends Produto {
  quantidade: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterLink
  ],
})
export class HomePage implements OnInit {
  produtos: Produto[] = [];
   private todosOsProdutosDaCategoria: Produto[] = [];
  carregando = true;
  carrinho: ItemCarrinho[] = [];
  totalCarrinho = 0;
  tituloCategoria = 'Cardápio';

  constructor(
    private menuService: MenuService,
    private modalCtrl: ModalController,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const categoria = params.get('categoria');
      this.carregarProdutos(categoria);
    });
  }

  handleSearch(event: any) {
  const termoBusca = event.target.value.toLowerCase();

  // Se o termo da busca estiver vazio, restaura a lista completa da categoria
  if (!termoBusca) {
    this.produtos = this.todosOsProdutosDaCategoria;
    return;
  }

  // Se houver um termo, filtra a lista que já temos
  this.produtos = this.todosOsProdutosDaCategoria.filter(p =>
    p.nome.toLowerCase().includes(termoBusca)
  );
}

  carregarProdutos(categoria: string | null) {
    this.carregando = true;
    this.menuService.getProdutos().subscribe({
      next: (data) => {
        if (!categoria) {
  this.produtos = data;
} else {
  this.produtos = data.filter(
    p => p.categoria.toLowerCase() === categoria.toLowerCase()
  );
}
this.todosOsProdutosDaCategoria = this.produtos; 
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
    this.totalCarrinho = this.carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
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
      componentProps: { total: this.totalCarrinho, carrinho: this.carrinho }
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
      itens: this.carrinho.filter(item => !!item._id).map(item => ({
        produtoId: item._id!,
        nome: item.nome,
        quantidade: item.quantidade,
        preco: item.preco
      })),
      total: this.totalCarrinho
    };
    this.menuService.enviarPedido(pedidoParaAPI).subscribe({
      next: () => {
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
}
