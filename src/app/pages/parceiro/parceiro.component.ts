import { Component, inject, Input } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Parceiro } from '../../_core/entities/Parceiro.entity';
import { AuthService } from '../../_core/services/auth.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ShowModalService } from '../../_core/services/showModal.service';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { LoginDTO } from '../../_core/DTOs/login-Dto';
@Component({
  selector: 'app-parceiro',
  standalone: true,
  imports: [ReactiveFormsModule, DialogComponent],
  templateUrl: './parceiro.component.html',
  styleUrl: './parceiro.component.css',
})
export class ParceiroComponent {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private parceiro = inject(AuthService);
  private modal = inject(ShowModalService);
  senhasDiferentes: boolean = false;
  senhaDifereAntiga: boolean = false;
  @Input() visible: boolean = false;

  user!: Parceiro;
  form: FormGroup = this.fb.group({
    iParceiroID: ['', Validators.required],
    sNome: ['', Validators.required],
    sEmail: ['', [Validators.required, Validators.email]],
    sLinkParceiro: ['', Validators.required],
    iStoreID: ['', Validators.required],
    sSenha: ['', Validators.required],
  });
  dialogInputs = [
    { label: 'Nova senha', type: 'text', name: 'sSenhaNova', value: '' },
    {
      label: 'confirme a senha',
      type: 'text',
      name: 'sSenhaConfirme',
      value: '',
    },

    { label: 'Senha antiga', type: 'password', name: 'sSenha', value: '' },
  ];

  ngOnInit() {
    this.buscaParceiro();
    this.observadorModal();
  }
  observadorModal() {
    this.modal.visible$.subscribe((isVisible) => {
      this.visible = isVisible;
    });
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

  abrirModalAlterarSenha() {
    this.visible = true;
    this.modal.show();
    console.log('acionado');
  }

  alterarSenhaRequest(event: any) {
    const senhaAntiga = event.sSenha;
    const senhaNova = event.sSenhaNova;
    const senhaConfirme = event.sSenhaConfirme;
    console.log(senhaAntiga, senhaNova, senhaConfirme);

    if (senhaNova && senhaConfirme && senhaNova === senhaConfirme) {
      this.verificaSenhaAntiga(senhaAntiga).subscribe((confirmacao) => {
        if (confirmacao) {
          console.log('Senha confirmada');
          this.senhasDiferentes = false;
          this.senhaDifereAntiga = false;
          // escrever aqui logica de request alterar senha
        } else {
          console.error('Senha antiga incorreta.');
          this.senhaDifereAntiga = true;
        }
      });
    } else {
      console.log('suas senhas não são iguais');
      this.senhasDiferentes = true;
    }
  }

  verificaSenhaAntiga(senha: string) {
    const user = this.parceiro.getLoggedUser();
    if (!user) {
      return of(false); // Retorna `false` imediatamente se não houver usuário logado
    }

    const loginDTO: LoginDTO = {
      sEmail: user.sEmail,
      sSenha: senha,
    };

    // Retorna o Observable para ser assinado na `AlterarSenhaRequest`
    return this.auth.login(loginDTO).pipe(
      map((response) => !!response), // Converte o response em um booleano
      catchError((error) => {
        console.error('Erro no login:', error);
        return of(false);
      })
    );
  }
}
