import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Parceiro } from '../../_core/entities/Parceiro.entity';
import { AuthService } from '../../_core/services/auth.service';

@Component({
  selector: 'app-parceiro',
  standalone: true,
  imports: [],
  templateUrl: './parceiro.component.html',
  styleUrl: './parceiro.component.css',
})
export class ParceiroComponent {
  private parceiro = inject(AuthService);
  user!: Parceiro;

  ngOnInit() {
    this.buscaParceiro();
  }

  buscaParceiro() {
    const user = this.parceiro.getLoggedUser();
    if (user) {
      console.log('seu user na tela ', user);
      this.user = user;
    } else {
      console.log('houve alguma falha em exibir o usuario ');
    }
  }
}
