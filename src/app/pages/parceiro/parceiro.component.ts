import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Parceiro } from '../../_core/entities/Parceiro.entity';
import { AuthService } from '../../_core/services/auth.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-parceiro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './parceiro.component.html',
  styleUrl: './parceiro.component.css',
})
export class ParceiroComponent {
  private fb = inject(FormBuilder);
  private parceiro = inject(AuthService);
  user!: Parceiro;
  form: FormGroup = this.fb.group({
    iParceiroID: ['', Validators.required],
    sNome: ['', Validators.required],
    sEmail: ['', [Validators.required, Validators.email]],
    sLinkParceiro: ['', Validators.required],
    iStoreID: ['', Validators.required],
    sSenha: ['', Validators.required],
  });

  ngOnInit() {
    this.buscaParceiro();
  }
  abrirModalAlterarSenha() {
    console.log('evento');
  }

  buscaParceiro() {
    const user = this.parceiro.getLoggedUser();
    if (user) {
      console.log('seu user na tela ', user);
      this.user = user;
      this.form.setValue({
        iParceiroID: user.iParceiroID,
        sNome: user.sNome,
        sEmail: user.sEmail,
        sLinkParceiro: user.sLinkParceiro,
        iStoreID: user.iStoreID,
        sSenha: user.sSenha, // Não preencha a senha por segurança
      });
    } else {
      console.log('houve alguma falha em exibir o usuario ');
    }
  }
}
