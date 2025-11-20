// src/app/pages/products/products.component.ts (O Novo Cérebro)

import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router'; 
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Tenis } from '../../models/tenis.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CurrencyPipe,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit { 

  todosProdutos: Tenis[] = [];
  produtos: Tenis[] = [];
  categoriaAtiva: string = 'todos'; 

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.productService.getTenis().subscribe(data => {
      this.todosProdutos = data;
      this.route.queryParamMap.subscribe(params => {
        this.categoriaAtiva = params.get('categoria') || 'todos'; 
        this.aplicarFiltro();
      });
    });
  }

  aplicarFiltro(): void {
    if (this.categoriaAtiva && this.categoriaAtiva !== 'todos') {
      this.produtos = this.todosProdutos.filter(prod => 
        prod.categoria === this.categoriaAtiva
      );
    } else {
      
      this.produtos = this.todosProdutos;
    }
  }
  filtrarComDropdown(event: any): void {
    const categoria = event.target.value;
    this.router.navigate(['/products'], { 
      queryParams: { categoria: categoria } 
    });
  }

  comprar(produto: Tenis): void {
    this.cartService.adicionarAoCarrinho(produto);
    this.router.navigate(['/cart']);
  }
}