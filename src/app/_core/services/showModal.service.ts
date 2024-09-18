import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowModalService {
  // Inicializa o BehaviorSubject com o valor inicial de `true`
  // `BehaviorSubject` é usado para manter o estado da visibilidade do modal
  private visibleSubject = new BehaviorSubject<boolean>(false);

  // `visible$` é o Observable que outros componentes podem observar
  visible$ = this.visibleSubject.asObservable();

  // Exibe o modal e emite o novo estado
  show() {
    this.visibleSubject.next(true);
  }

  // Oculta o modal e emite o novo estado
  hide() {
    this.visibleSubject.next(false);
  }

  // Retorna o estado atual do menu
}
