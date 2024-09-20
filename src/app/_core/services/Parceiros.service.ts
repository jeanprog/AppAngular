import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ParceiroHttpRepository } from '../../_data/repositories/Parceiro-http.repository';
import { updateParceiro } from '../entities/UpdateParceiro.entity';

@Injectable({
  providedIn: 'root',
})
export class ParceirosServices {
  constructor(private parceiroHttp: ParceiroHttpRepository) {}

  updateSenhaParceiroHttp(
    parceiro: updateParceiro
  ): Observable<updateParceiro> {
    return this.parceiroHttp.updateParceiro(parceiro);
  }
}
