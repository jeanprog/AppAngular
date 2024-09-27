// src/app/data/repositories/user-http.repository.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Comissao } from '../../_core/entities/comissao.entity';
import { ComissaoRepository } from '../../_core/interfaces/comissao-repository.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ComissaoHttpRepository implements ComissaoRepository {
  constructor(private http: HttpClient) {}

  private api = environment.apiUrl;

  criarComissao(comissao: Comissao): Observable<Comissao> {
    console.log('Saída de Comissao:', comissao); // Imprime a comissao no console
    return this.http.post<Comissao>(
      this.api + 'Comissoes/CadatrarComissoesFranqueado',
      comissao
    ); // Retorna o objeto Comissao como um Observable
    /*   return of(comissao); */
  }

  alterarComissao(comissao: Comissao): Observable<Comissao> {
    const url = this.api + 'Comissoes/AlterarComissoesFranqueado';

    console.log(comissao);

    return this.http.put<Comissao>(url, comissao).pipe(
      tap((response: Comissao) => {
        console.log('Comissao alterada com sucesso:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na requisição de alteração:', error);
        return throwError(
          () => new Error('Erro ao alterar a comissao, tente novamente.')
        );
      })
    );
  }
  listaComissao(
    iParceiroID: number,
    iFranquiaID: number
  ): Observable<Comissao[]> {
    const api =
      this.api +
      `Comissoes/ListarComissoesFranqueado?iParceiroID=${iParceiroID}&iFranquiaID=${iFranquiaID}`;

    // Executa a requisição e observa a saída
    return this.http.get<Comissao[]>(api).pipe(
      tap((response: Comissao[]) => {}),
      catchError((error: any) => {
        console.error('Erro na requisição:', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }

  deletarComissao(iComissaoID: number): Observable<void> {
    const api = `${
      this.api
    }Comissoes/DeletarComissoesFranqueado?iComissaoID=${iComissaoID.toString()}`;
    console.log('Requisição DELETE para:', api);

    // Executa a requisição DELETE e observa a saída
    return this.http.delete<void>(api).pipe(
      tap(() => {
        console.log(`Comissao com ID ${iComissaoID} deletada com sucesso`);
      }),
      catchError((error: any) => {
        console.error('Erro na requisição DELETE:', error);
        return of(); // Retorna void em caso de erro
      })
    );
  }
}
