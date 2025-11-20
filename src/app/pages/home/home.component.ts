import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,    
    CommonModule,
    NavbarComponent,
    FooterComponent  
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isMenuAtivo = false;
  isBuscaAtiva = false;
  isHeaderScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isHeaderScrolled = window.scrollY > 100;
  }
  
  abrirMenu() {
    this.isMenuAtivo = true;
  }
  
  fecharMenu() {
    this.isMenuAtivo = false;
  }

  abrirBusca() {
    this.isBuscaAtiva = true;
  }
  
  fecharBusca() {
    this.isBuscaAtiva = false;
  }
}