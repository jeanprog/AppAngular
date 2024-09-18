import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EventMenuService } from '../../_core/services/EventMenu.service';
import { DarkModeService } from '../../_core/services/dark-mode.service';

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
  darkMode: boolean = false;

  showMenuClick() {
    const teste = this.showMenuService.toggleMenu();
    console.log(teste, 'teste');
  }

  HabilitardarkMode() {
    this.darkModeService.toggleDarkMode();
    this.darkMode = !this.darkMode;
  }
}
