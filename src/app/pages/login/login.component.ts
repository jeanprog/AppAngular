import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../_core/services/auth.service';
import { LoginDTO } from '../../_core/DTOs/login-Dto';
import { DarkModeService } from '../../_core/services/dark-mode.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // Dependências injetadas
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  // Estado do formulário e variáveis auxiliares
  protected isFormInvalid: boolean = false;
  falhaNologin: boolean = false;

  // Formulário reativo
  protected form = this.formBuilder.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required],
  });

  ngOnInit(): void {
    // Se o usuário já estiver autenticado, redireciona para a home
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  // Função de envio do formulário de login
  onclick() {
    if (this.form.valid) {
      this.isFormInvalid = false;

      // Cria o objeto DTO com os dados do formulário
      const loginDTO: LoginDTO = {
        sEmail: this.form.get('usuario')?.value!,
        sSenha: this.form.get('senha')?.value!,
      };

      // Chama o serviço de autenticação
      this.auth.login(loginDTO).subscribe({
        next: (response) => {
          // Se a resposta for válida, redireciona para a home
          if (response) {
            console.log('Login bem-sucedido:', response);
            this.router.navigate(['/home']);
          } else {
            console.error('Login falhou: Usuário ou senha incorretos.');
            this.falhaNologin = true;
          }
        },
        error: (error) => {
          console.error('Erro no login:', error);
        },
      });
    } else {
      // Se o formulário estiver inválido, marca como inválido
      console.log('Formulário inválido', this.form);
      this.isFormInvalid = true;
    }
  }
}
