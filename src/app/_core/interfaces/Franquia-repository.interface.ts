import { Observable } from 'rxjs';
import { Franquia } from '../entities/Franquia.entity';

export interface FranquiaRepository {
  criarFranquia(franquia: Franquia): Observable<Franquia>;
  listaFranquia(): Observable<Franquia[]>;
  alterarFranquia(franquia: Franquia): Observable<Franquia>;
  deletarFranquia(iFranquiaID: number, iParceiroID: number): Observable<void>;
}
