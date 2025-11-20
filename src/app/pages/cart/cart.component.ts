import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Tenis } from '../../models/tenis.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    NavbarComponent,
    FooterComponent,
    CurrencyPipe
  ],
  providers: [
    CurrencyPipe 
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  produtos: Tenis[] = [];
  totalProdutos = 0;
  valorFrete = 0;
  totalGeral = 0;
  mensagem = '';
  
  showCardModal = false; 
  showPixModal = false;  
  
  cards = [
    { id: 1, numero: '**** **** **** 9879', tipo: 'Crédito/Débito' },
    { id: 2, numero: '**** **** **** 1234', tipo: 'Crédito' }
  ];
  
  compraFinalizada = false;

  constructor(
    private cartService: CartService,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  carregarCarrinho(): void {
    this.produtos = this.cartService.getProdutosDoCarrinho();
    this.recalcularTotais();
  }

  removerItem(index: number): void {
    this.produtos = this.cartService.removerDoCarrinho(index);
    this.recalcularTotais();
  }

  recalcularTotais(): void {
    this.totalProdutos = this.produtos.reduce((acc, p) => acc + p.preco, 0);
    this.totalGeral = this.totalProdutos + this.valorFrete;
  }

  calcularFrete(endereco: string): void {
    if (!endereco.trim()) {
      this.mensagem = "Por favor, insira seu endereço.";
      return;
    }
    this.valorFrete = 20; 
    this.mensagem = `Frete calculado: R$ 20,00.`;
    this.recalcularTotais();
  }


  openCardModal(): void {
    if (this.produtos.length === 0) {
      alert("adicione coisas ao carrinho"); 
      return;
    }
    this.showCardModal = true;
  }
  closeCardModal(): void {
    this.showCardModal = false;
  }
  confirmarPagamentoFinal(card: any): void {
    this.compraFinalizada = true;
    const formattedTotal = this.currencyPipe.transform(this.totalGeral, 'BRL');
    this.mensagem = `Pagamento de ${formattedTotal} 
                     aprovado no cartão ${card.numero}. 
                     Obrigado por comprar conosco!`;
    this.cartService.limparCarrinho();
    this.closeCardModal();
  }

  openPixModal(): void {
    if (this.produtos.length === 0) {
      alert("adicione coisas ao carrinho"); 
    }
    this.showPixModal = true;
  }
  
  closePixModal(): void {
    this.showPixModal = false;
  }
}