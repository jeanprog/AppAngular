import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EventMenuService } from '../../_core/services/EventMenu.service';
import { DarkModeService } from '../../_core/services/dark-mode.service';
import { AuthService } from '../../_core/services/auth.service';
import { Parceiro } from '../../_core/entities/Parceiro.entity';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AvatarModule, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private darkModeService: DarkModeService) {}
  private showMenuService = inject(EventMenuService);
  private parceiro = inject(AuthService);
  darkMode: boolean = false;
  userName!: string;

  saudacao!: string;

  ngOnInit() {
    const user = this.parceiro.getLoggedUser();

    if (user) {
      this.userName = user.sNome;
      this.definirSaudacao();
    }
  }

  definirSaudacao() {
    const horaAtual = new Date().getHours();

    switch (true) {
      case horaAtual >= 6 && horaAtual < 12:
        this.saudacao = 'Bom dia';
        break;
      case horaAtual >= 12 && horaAtual < 18:
        this.saudacao = 'Boa tarde';
        break;
      default:
        this.saudacao = 'Boa noite';
    }
  }

  showMenuClick() {
    const teste = this.showMenuService.toggleMenu();
    console.log(teste, 'teste');
  }

  HabilitardarkMode() {
    this.darkModeService.toggleDarkMode();
    this.darkMode = !this.darkMode;
  }
}
