import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.page.html',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FinalizarPedidoModal {
  @Input() total!: number;
  @Input() carrinho: any[] = [];

  nomeCliente = '';
  tipoConsumo: 'local' | 'leve' = 'local';

  constructor(private modalCtrl: ModalController) {}

  fechar() {
    this.modalCtrl.dismiss();
  }

  confirmar() {
    if (!this.nomeCliente.trim()) return;
    this.modalCtrl.dismiss({
      nomeCliente: this.nomeCliente.trim(),
      tipoConsumo: this.tipoConsumo
    });
  }
}