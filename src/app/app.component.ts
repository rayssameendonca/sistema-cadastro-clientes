import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AutenticacaoService } from './services/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  routerUrl: string;

  constructor(
    private autenticacao: AutenticacaoService,
    private router: Router
  ) {
    this.routerUrl = '';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routerUrl = event.url;
      }
    });
  }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (!this.autenticacao.isLoggedIn() && !currentUser) {
      // Se o usuário não estiver autenticado e não houver informações no localStorage, redireciona para a página de login
      this.router.navigate(['/login']);
    } else {
      // Se o usuário estiver autenticado ou já existir informações no localStorage, redireciona para 'customer-list'
      this.router.navigate(['/customer-list']);
    }
  }
}
