import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  _id?: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
    imagemUrl?: string;
}

export interface ItemCarrinho extends Produto { 
  quantidade: number;
}

export interface Pedido {
  cliente: string;
  itens: { produtoId: string, quantidade: number, nome: string, preco: number}[];
  total: number;
}

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
} )
export class MenuService {

  constructor(private http: HttpClient ) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API_URL}/produtos` );
  }

  enviarPedido(pedido: Pedido): Observable<any> {
    return this.http.post(`${API_URL}/pedidos`, pedido );
  }

  //Métodos do crud do admin

   getProdutoById(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${API_URL}/produtos/${id}` );
  }

  criarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${API_URL}/produtos`, produto );
  }

  atualizarProduto(id: string, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${API_URL}/produtos/${id}`, produto );
  }

   deletarProduto(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/produtos/${id}` );
  }

}
