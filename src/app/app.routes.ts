import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ParceiroComponent } from './pages/parceiro/parceiro.component';
import { FranquiaComponent } from './pages/franquia/franquia.component';
import { ComissaoComponent } from './pages/comissao/comissao.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';
import { AuthGuard } from './_guard/autorizado.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'parceiro', component: ParceiroComponent, canActivate: [AuthGuard] },
  { path: 'franquia', component: FranquiaComponent, canActivate: [AuthGuard] },
  { path: 'comissao', component: ComissaoComponent, canActivate: [AuthGuard] },
  {
    path: 'relatorio',
    component: RelatorioComponent,
    canActivate: [AuthGuard],
  },
];
