import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Tenis } from '../../../models/tenis.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component'; 
import { FooterComponent } from '../../../components/footer/footer.component'; 

@Component({
  selector: 'app-tenis-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    NavbarComponent, 
    FooterComponent  
  ],
  templateUrl: './tenis-list.component.html',
  styleUrls: ['./tenis-list.component.css']
})
export class TenisListComponent implements OnInit {

  tenisLista: Tenis[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.carregarTenis();
  }
  carregarTenis(): void {
    this.productService.getTenis().subscribe(data => {
      this.tenisLista = data;
    });
  }
  excluir(id: number | undefined): void {
    if (!id) {
      return;
    }
    const confirmacao = window.confirm('Tem a certeza que quer excluir este item?');
    if (confirmacao) {
      this.productService.deleteTenis(id).subscribe(() => {
        alert('Item excluído com sucesso!');
        this.carregarTenis(); 
      });
    }
  
  }
}