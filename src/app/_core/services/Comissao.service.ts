import { Injectable } from '@angular/core';
import { ComissaoHttpRepository } from '../../_data/repositories/Comissao-http.repository';
import { Comissao } from '../entities/comissao.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComissaoRepositoreService {
  constructor(private comissaoHttp: ComissaoHttpRepository) {}

  criarComissao(comissao: Comissao): Observable<Comissao> {
    // Retorne o Observable da chamada ao repositório HTTP
    return this.comissaoHttp.criarComissao(comissao);
  }

  listarTodasComissaos(
    iParceiroID: number,
    iFranquiaID: number
  ): Observable<Comissao[]> {
    return this.comissaoHttp.listaComissao(iParceiroID, iFranquiaID);
  }

  alterarComissao(comissao: Comissao): Observable<Comissao> {
    return this.comissaoHttp.alterarComissao(comissao);
  }

  deletarComissao(iComissaoID: number) {
    return this.comissaoHttp.deletarComissao(iComissaoID);
  }
}
