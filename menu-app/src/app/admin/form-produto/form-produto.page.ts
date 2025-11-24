import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuService, Produto } from '../../services/menu.services';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.page.html',
  styleUrls: ['./form-produto.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule ]
})
export class FormProdutoPage implements OnInit {

  produto: Produto = {
    nome: '',
    preco: 0,
    categoria: '',
    descricao: '',
     imagemUrl: '' 
  };
  isEditing = false;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditing = true;
      this.menuService.getProdutoById(productId).subscribe((res: any) => {
        this.produto = res;
      });
    }
  }

  salvar() {
    const observable = this.isEditing
      ? this.menuService.atualizarProduto(this.produto._id!, this.produto)
      : this.menuService.criarProduto(this.produto);

    observable.subscribe(() => {
      this.router.navigate(['/admin/lista-produtos']);
    });
  }
}
