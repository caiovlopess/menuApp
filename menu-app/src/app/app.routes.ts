import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'home/:categoria', // Rota para filtrar por categoria
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'admin/lista-produtos',
    loadComponent: () => import('./admin/lista-produtos/lista-produtos.page').then( m => m.ListaProdutosPage)
  },
  {
    path: 'admin/form-produto',
    loadComponent: () => import('./admin/form-produto/form-produto.page').then( m => m.FormProdutoPage)
  },
  {
    path: 'admin/form-produto/:id',
    loadComponent: () => import('./admin/form-produto/form-produto.page').then( m => m.FormProdutoPage)
  },
];
