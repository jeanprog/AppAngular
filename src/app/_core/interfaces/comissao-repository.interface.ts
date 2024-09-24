import { Observable } from 'rxjs';
import { Comissao } from '../entities/comissao.entity';

export interface ComissaoRepository {
  criarComissao(comissao: Comissao): Observable<Comissao>;
  listaComissao(
    iParceiroID: number,
    iFranquiaID: number
  ): Observable<Comissao[]>;
  alterarComissao(comissao: Comissao): Observable<Comissao>;
  deletarComissao(iComissaoID: number): Observable<void>;
}
