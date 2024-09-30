import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './_core/services/auth.service';
import { CommonModule } from '@angular/common';
import { DarkModeService } from './_core/services/dark-mode.service';
import { filter, Subscription } from 'rxjs';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    BreadcrumbModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'LaserParceirando';
  auth = inject(AuthService);
  private subscription: Subscription = new Subscription();
  items: MenuItem[] = [];
  home: MenuItem | undefined;

  constructor(
    private darkModeService: DarkModeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    // Subscrição ao evento de navegação
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.addToBreadcrumb(); // Adiciona ao breadcrumb sem sobrescrever
        })
    );

    // Subscrição ao modo escuro
    this.subscription.add(
      this.darkModeService.darkMode$.subscribe((isDarkMode) => {
        document.documentElement.classList.toggle('dark', isDarkMode);
      })
    );
  }

  // Função para adicionar ao breadcrumb (sem sobrescrever)
  private addToBreadcrumb() {
    let route = this.activatedRoute.root;
    let url = '';
    const breadcrumbs: MenuItem[] = [...this.items]; // Mantém o histórico existente

    while (route.firstChild) {
      route = route.firstChild;
      const routeConfig = route.snapshot.url;

      if (routeConfig.length > 0) {
        const path = routeConfig.map((segment) => segment.path).join('/');
        url += `/${path}`;

        // Verifica se já existe no histórico para não duplicar
        if (!breadcrumbs.some((item) => item.routerLink === url)) {
          breadcrumbs.push({
            label: path,
            routerLink: url,
          });
        }
      }
    }

    this.items = breadcrumbs; // Atualiza o array de breadcrumbs
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Limpa a inscrição para evitar vazamentos de memória
    this.auth.logout();
    localStorage.clear();
  }
}
