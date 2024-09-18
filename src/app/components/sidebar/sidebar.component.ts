import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router } from '@angular/router';
import { AuthService } from '../../_core/services/auth.service';
import { CommonModule } from '@angular/common'; // Use CommonModule em vez de BrowserModule
import { EventMenuService } from '../../_core/services/EventMenu.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    PanelMenuModule,
    CommonModule,
    Button, // Para ter acesso a diretivas como NgIf, NgFor, etc.
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] | undefined;
  showLabels: boolean = true;
  isSidebarVisible: boolean = false;
  private router = inject(Router);
  private auth = inject(AuthService);
  private showMenuService = inject(EventMenuService);

  logout = () => {
    this.auth.logout();
    this.router.navigate(['']);
  };
  /*   ngDoCheck() {
    this.showLabels = this.showMenu.getMenuState();
    console.log(this.showLabels, 'sidebar');
  } */
  ngOnInit() {
    this.showMenuService.showMenu$.subscribe((state: boolean) => {
      this.showLabels = state;

      this.updateItens();
    });

    this.auth.isLoggedIn();
  }

  updateItens() {
    this.items = [
      {
        label: this.showLabels ? 'Home' : '',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/home']),

        items: [],
      },
      {
        label: this.showLabels ? 'Parceiro' : '',
        icon: 'pi pi-file',
        command: () => this.router.navigate(['/parceiro']),

        items: [],
      },
      {
        label: this.showLabels ? 'Franquia' : '',
        icon: 'pi pi-cloud',
        command: () => this.router.navigate(['/franquia']),

        items: [],
      },
      {
        label: this.showLabels ? 'Comissão' : '',
        icon: 'pi pi-desktop',
        command: () => this.router.navigate(['/comissao']),
      },
      {
        label: this.showLabels ? 'Relatórios ' : '',
        icon: 'pi pi-cloud',

        items: [
          {
            label: 'Operacional',
          },
          {
            label: 'Vendas',
          },
        ],
      },
    ];
  }
}
