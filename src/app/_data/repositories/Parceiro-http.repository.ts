// src/app/data/repositories/user-http.repository.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Parceiro } from '../../_core/entities/Parceiro.entity';
import { ParceiroRepository } from '../../_core/interfaces/Parceiro-repository.interface';
import { environment } from '../../../environments/environment.development';
import { LoginDTO } from '../../_core/DTOs/login-Dto';
import { updateParceiro } from '../../_core/entities/UpdateParceiro.entity';

@Injectable({
  providedIn: 'root',
})
export class ParceiroHttpRepository implements ParceiroRepository {
  constructor(private http: HttpClient) {}

  private api = environment.apiUrl;

  loginParceiro(parceiro: LoginDTO): Observable<Parceiro[]> {
    const api = `${this.api}Parceiros/LoginParceiro`;

    return this.http.post<Parceiro[]>(api, parceiro).pipe(
      catchError((error) => {
        console.error('Erro durante a requisição a api:', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }
  updateParceiro(parceiro: updateParceiro): Observable<updateParceiro> {
    const api = `${this.api}Parceiros/AlterarSenhaParceiro`;
    console.log('repository,', parceiro, api);
    return this.http.post<updateParceiro>(api, parceiro);
  }

  /* 
  updateParceiro(Parceiro: Parceiro): Observable<Parceiro> {
    const url = this.api + 'AlterarSenhaParceiro/AParceiro';

    console.log(Parceiro);

    return this.http.put<Parceiro>(url, Parceiro).pipe(
      tap((response: Parceiro) => {
        console.log('Parceiro alterada com sucesso:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na requisição de alteração:', error);
        return throwError(
          () => new Error('Erro ao alterar a Parceiro, tente novamente.')
        );
      })
    );
  } */
}

/*   private api = environment.apiUrl;

  

  criarParceiro(Parceiro: Parceiro): Observable<any> {
    return this.http.post(this.api + 'Parceiros/CadatrarParceiro', Parceiro);
  } */
