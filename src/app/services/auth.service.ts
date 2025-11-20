import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // login dos cria
  private getUsuarios(): any[] {
    const usuarios = localStorage.getItem("usuarios");
    return usuarios ? JSON.parse(usuarios) : [];
  }

  // cadastro dos cria
  register(usuario: any): boolean {
    const usuarios = this.getUsuarios();
    // ve se o email dos cria existe
    const usuarioExistente = usuarios.find(u => u.email === usuario.email);
    if (usuarioExistente) {
      alert("Este e-mail já está cadastrado.");
      return false;
    }

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Cadastro realizado com sucesso!");
    return true;
  }

  // loginn dos cria soq com logica
  login(email: string, senha: string): boolean {
    const usuarios = this.getUsuarios();
    
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuarioEncontrado) {
      sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
      return true;
    } else {
      alert("Email ou senha incorretos!");
      return false;
    }
  }
  logout() {
    sessionStorage.removeItem("usuarioLogado");
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem("usuarioLogado") !== null;
  }
}