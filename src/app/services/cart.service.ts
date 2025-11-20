import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  private obterCarrinho(): any[] {
    const carrinho = localStorage.getItem("carrinho");
    return carrinho ? JSON.parse(carrinho) : [];
  }
  private salvarCarrinho(produtos: any[]) {
    localStorage.setItem("carrinho", JSON.stringify(produtos));
  }
  adicionarAoCarrinho(produto: any) {
    const carrinho = this.obterCarrinho();
    carrinho.push(produto);
    this.salvarCarrinho(carrinho);
    alert(`${produto.nome} foi adicionado ao carrinho!`);
  }
  getProdutosDoCarrinho(): any[] {
    return this.obterCarrinho();
  }
  removerDoCarrinho(index: number): any[] {
    const carrinho = this.obterCarrinho();
    carrinho.splice(index, 1);
    this.salvarCarrinho(carrinho);
    return carrinho;
  }
  limparCarrinho() {
    this.salvarCarrinho([]);
  }
}