import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(
    this.getDarkModeFromLocalStorage()
  );
  darkMode$ = this.darkModeSubject.asObservable();

  // Obter o estado do localStorage
  private getDarkModeFromLocalStorage(): boolean {
    return localStorage.getItem('dark') === 'true';
  }

  // Alternar o modo dark e atualizar o BehaviorSubject
  toggleDarkMode() {
    const isDarkMode = !this.darkModeSubject.value;
    localStorage.setItem('dark', isDarkMode.toString());
    this.darkModeSubject.next(isDarkMode); // Atualiza o observable
  }
}
