import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './_core/services/auth.service';
import { CommonModule } from '@angular/common';
import { DarkModeService } from './_core/services/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LaserParceirando';
  auth = inject(AuthService);
  private subscription: Subscription = new Subscription();

  constructor(private darkModeService: DarkModeService) {}
  ngOnInit() {
    this.subscription.add(
      this.darkModeService.darkMode$.subscribe((isDarkMode) => {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Limpa a inscrição para evitar vazamentos de memória
  }
}
