
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink 
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuAtiva = false; 
  isHeaderScrolled = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isHeaderScrolled = window.scrollY > 100;
  }
  abrirMenu() { this.isMenuAtiva = true; }
  fecharMenu() { this.isMenuAtiva = false; }
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  logout(): void {
    this.authService.logout();
  }
}