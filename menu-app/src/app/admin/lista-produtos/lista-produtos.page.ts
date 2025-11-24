import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, IonItemSliding } from '@ionic/angular';
import { MenuService, Produto } from '../../services/menu.services';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule ]
})
export class ListaProdutosPage implements OnInit {

  produtos: Produto[] = [];

  constructor(
    private menuService: MenuService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.menuService.getProdutos().subscribe((res: Produto[]) => {
      this.produtos = res;
    });
  }

  adicionarNovo() {
    this.router.navigate(['/admin/form-produto']);
  }

  editar(produto: Produto, itemSliding: IonItemSliding) {
    itemSliding.close();
    this.router.navigate(['/admin/form-produto', produto._id]);
  }

  async deletar(produto: Produto, itemSliding: IonItemSliding) {
    itemSliding.close();
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Deseja realmente deletar "${produto.nome}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Deletar',
          handler: () => {
            this.menuService.deletarProduto(produto._id!).subscribe(() => {
              this.produtos = this.produtos.filter(p => p._id !== produto._id);
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
