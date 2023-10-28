import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  usuarioPadrao: string = 'admin';
  senhaPadrao: string = 'admin';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    const usuarioControl = this.loginForm.get('usuario');
    const senhaControl = this.loginForm.get('senha');

    if (usuarioControl?.value && senhaControl?.value) {
      const usuario = usuarioControl.value;
      const senha = senhaControl.value;

      if (usuario === this.usuarioPadrao && senha === this.senhaPadrao) {
        console.log('Login bem-sucedido!');

        localStorage.setItem(
          'currentUser',
          JSON.stringify({ username: usuario })
        );

        this.router.navigateByUrl('/customer-list');
      } else {
        alert('Nome de usuário ou senha inválidos. Tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}
