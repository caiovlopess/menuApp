import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ItemCarrinho } from '../services/menu.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule] 
})
export class CartModalPage implements OnInit {

  @Input() carrinho: ItemCarrinho[] = [];
  @Input() total: number = 0;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  fecharModal() {
    
    this.modalCtrl.dismiss({ removed: false });
  }

  removerItem(produtoId: any) {
  
    const index = this.carrinho.findIndex(item => item._id === produtoId);
    if (index > -1) {
      this.carrinho.splice(index, 1);
    }
    
    this.total = this.carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    
    this.modalCtrl.dismiss({ 
      removed: true, 
      novoCarrinho: this.carrinho,
      novoTotal: this.total
    });
  }
}


