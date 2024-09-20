import { Observable } from 'rxjs';
import { Parceiro } from '../entities/Parceiro.entity';
import { LoginDTO } from '../DTOs/login-Dto';
import { updateParceiro } from '../entities/UpdateParceiro.entity';

export interface ParceiroRepository {
  loginParceiro(Parceiro: LoginDTO): Observable<Parceiro[]>;
  updateParceiro(Parceiro: updateParceiro): Observable<updateParceiro>;
}
