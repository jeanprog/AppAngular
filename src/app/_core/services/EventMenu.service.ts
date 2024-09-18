import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventMenuService {
  // Inicializa o BehaviorSubject com o valor inicial de `true`
  private showMenuSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  // Exponha o BehaviorSubject como um Observable para que outros componentes possam se inscrever
  public showMenu$: Observable<boolean> = this.showMenuSubject.asObservable();

  // Alterna o estado do menu e emite o novo valor
  toggleMenu(): void {
    const currentState = this.showMenuSubject.getValue();
    this.showMenuSubject.next(!currentState);
  }
  toggleMenuMobile(): void {
    const currentState = this.showMenuSubject.getValue();
    this.showMenuSubject.next(!currentState);
  }

  // Retorna o estado atual do menu
  getMenuState(): boolean {
    return this.showMenuSubject.getValue();
  }
}
