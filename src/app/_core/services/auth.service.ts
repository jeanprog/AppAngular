import { Injectable } from '@angular/core';
import { ParceiroHttpRepository } from '../../_data/repositories/Parceiro-http.repository';
import { LoginDTO } from '../DTOs/login-Dto';
import { Router } from '@angular/router'; // Para redirecionar após login
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Parceiro } from '../entities/Parceiro.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';
  private readonly USER_KEY = 'user';

  constructor(
    private parceiroHttp: ParceiroHttpRepository,
    private router: Router
  ) {}

  login(parceiro: LoginDTO) {
    // Fazendo a requisição de login
    return this.parceiroHttp.loginParceiro(parceiro).pipe(
      map((response) => {
        // Verifica se a resposta é um array e se contém algum elemento
        if (Array.isArray(response) && response.length > 0) {
          return response[0]; // Retorna o primeiro usuário
        } else {
          throw new Error('Resposta de login inválida ou vazia'); // Lança um erro se a resposta for inválida
        }
      }),
      tap((user) => {
        // Armazenar dados no localStorage caso o login seja bem-sucedido
        if (user) {
          console.log('Login bem-sucedido:', user);
          localStorage.setItem(this.AUTH_KEY, 'true');
          localStorage.setItem(this.USER_KEY, JSON.stringify(user)); // Armazena o usuário retornado // Navega para a página de sucesso
        }
      }),
      catchError((error) => {
        console.error('Erro durante o login:', error);
        return of(null); // Retorna null para indicar falha na autenticação
      })
    );
  }

  logout() {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']); // Redireciona para a página de login após logout
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  getLoggedUser(): Parceiro {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null; // Retorna o usuário logado, se existir
  }

  updateSenhaNoLocalStorage(novaSenha: string): void {
    const user = this.getLoggedUser(); // Recupera o usuário atual
    if (user) {
      console.log('senhastorage', novaSenha);
      user.sSenha = novaSenha; // Atualiza o campo sSenha
      localStorage.setItem(this.USER_KEY, JSON.stringify(user)); // Salva o usuário atualizado
    }
  }
}
