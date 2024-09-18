import { Injectable } from '@angular/core';
import { FranquiaHttpRepository } from '../../_data/repositories/Franquia-http.repository';
import { Franquia } from '../entities/Franquia.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FranquiaRepositoreService {
  constructor(private franquiaHttp: FranquiaHttpRepository) {}

  criarFranquia(franquia: Franquia): Observable<Franquia> {
    // Retorne o Observable da chamada ao repositório HTTP
    return this.franquiaHttp.criarFranquia(franquia);
  }

  listarTodasFranquias(): Observable<Franquia[]> {
    return this.franquiaHttp.listaFranquia();
  }

  alterarFranquia(franquia: Franquia): Observable<Franquia> {
    return this.franquiaHttp.alterarFranquia(franquia);
  }

  deletarFranquia(iFranquiaID: number, iParceiroID: number) {
    return this.franquiaHttp.deletarFranquia(iFranquiaID, iParceiroID);
  }
}
