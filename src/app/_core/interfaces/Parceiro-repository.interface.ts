import { Observable } from 'rxjs';
import { Parceiro } from '../entities/Parceiro.entity';
import { LoginDTO } from '../DTOs/login-Dto';

export interface ParceiroRepository {
  loginParceiro(Parceiro: LoginDTO): Observable<Parceiro[]>;
  updateParceiro(Parceiro: Parceiro): Observable<Parceiro>;
}
