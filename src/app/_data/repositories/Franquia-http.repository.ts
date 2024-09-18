// src/app/data/repositories/user-http.repository.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Franquia } from '../../_core/entities/Franquia.entity';
import { FranquiaRepository } from '../../_core/interfaces/Franquia-repository.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FranquiaHttpRepository implements FranquiaRepository {
  constructor(private http: HttpClient) {}

  private api = environment.apiUrl;

  criarFranquia(franquia: Franquia): Observable<Franquia> {
    console.log('Saída de Franquia:', franquia); // Imprime a franquia no console
    return this.http.post<Franquia>(
      this.api + 'Franquias/CadatrarFranquia',
      franquia
    ); // Retorna o objeto Franquia como um Observable
    /*   return of(franquia); */
  }

  alterarFranquia(franquia: Franquia): Observable<Franquia> {
    const url = this.api + 'Franquias/AlterarFranquia';

    console.log(franquia);

    return this.http.put<Franquia>(url, franquia).pipe(
      tap((response: Franquia) => {
        console.log('Franquia alterada com sucesso:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na requisição de alteração:', error);
        return throwError(
          () => new Error('Erro ao alterar a franquia, tente novamente.')
        );
      })
    );
  }
  listaFranquia(): Observable<Franquia[]> {
    const api = this.api + 'Franquias/ListarFranquias';

    // Executa a requisição e observa a saída
    return this.http.get<Franquia[]>(api).pipe(
      tap((response: Franquia[]) => {}),
      catchError((error: any) => {
        console.error('Erro na requisição:', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }

  deletarFranquia(iFranquiaID: number, iParceiroID: number): Observable<void> {
    const api = `${
      this.api
    }Franquias/DeletarFranquia?iFranquiaID=${iFranquiaID.toString()}&iParceiroID=${iParceiroID.toString()}`;
    console.log('Requisição DELETE para:', api);

    // Executa a requisição DELETE e observa a saída
    return this.http.delete<void>(api).pipe(
      tap(() => {
        console.log(
          `Franquia com ID ${iFranquiaID} e Parceiro ID ${iParceiroID} deletada com sucesso`
        );
      }),
      catchError((error: any) => {
        console.error('Erro na requisição DELETE:', error);
        return of(); // Retorna void em caso de erro
      })
    );
  }
}

/*   private api = environment.apiUrl;

  

  criarFranquia(Franquia: Franquia): Observable<any> {
    return this.http.post(this.api + 'Franquias/CadatrarFranquia', Franquia);
  } */
