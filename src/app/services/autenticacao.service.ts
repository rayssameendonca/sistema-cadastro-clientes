import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private isAuthenticated: boolean = false;

  login(usuario: string, senha: string): boolean {
    if (usuario === 'admin' && senha === 'admin') {
      this.isAuthenticated = true;
      localStorage.setItem('currentUser', usuario);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
