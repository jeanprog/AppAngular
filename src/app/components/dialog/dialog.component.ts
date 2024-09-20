import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { ShowModalService } from '../../_core/services/showModal.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FranquiaRepositoreService } from '../../_core/services/Franquia.service';
import { Franquia } from '../../_core/entities/Franquia.entity';
import { Subscription } from 'rxjs';
import { EmailValidator } from '../../utils/format-email';
import { AuthService } from '../../_core/services/auth.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    ReactiveFormsModule,
    CommonModule,
    DropdownModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  dialog = inject(ShowModalService);

  inputUnico: boolean = false;
  elaborado: boolean = false;

  form: FormGroup = this.fb.group({});
  @Input() PropsItemFranquia?: Franquia;
  @Input() PropsSenhasDiferentes: boolean = false;
  @Input() PropsSenhaDifereAntiga: boolean = false;
  @Input() visible: boolean = false;
  @Input() tipoModal: string | undefined;
  preecherForm: boolean = false;

  @Input() inputs: {
    label: string;
    type: string;
    name: string;
    value?: any;
  }[] = [];
  @Output() formularioEnviado = new EventEmitter<any>();
  @Output() copiarTexto = new EventEmitter<any>();
  private onChangeSubscription: Subscription = new Subscription();
  private parceiro = inject(AuthService);

  ngOnInit(): void {
    const formGroup: { [key: string]: any } = {};
    console.log(this.tipoModal);

    // Adiciona controles ao formGroup com base no nome especificado no input
    if (this.tipoModal === 'franquia') {
      this.inputs.forEach((input) => {
        formGroup[input.name] = [input.value || '', Validators.required];
      });
      formGroup['sTipoLink'] = ['', Validators.required];
      formGroup['sLinkFranquia'] = ['', Validators.required];
      formGroup['sEmail'] = [
        '',
        [Validators.required, EmailValidator.emailValidator],
      ];
    }
    if (this.tipoModal === 'senha') {
      this.inputs.forEach((input) => {
        formGroup[input.name] = [input.value || '', Validators.required];
      });
    }
    this.form = this.fb.group(formGroup);

    // Cria o FormGroup com os controles configurados
  }

  ngOnChanges() {
    console.log(this.PropsSenhasDiferentes, 'dialog');

    if (this.PropsItemFranquia && this.PropsItemFranquia !== undefined) {
      this.form.get('sNome')?.setValue(this.PropsItemFranquia.sNome);
      this.form.get('sEmail')?.setValue(this.PropsItemFranquia.sEmail);
      this.form.get('sSenha')?.setValue(this.PropsItemFranquia.sSenha);
      this.form.get('sLink')?.setValue(this.PropsItemFranquia.sLinkFranquia);
      this.form.get('sTipoLink')?.setValue(this.PropsItemFranquia.sTipoLink);
      if (this.PropsItemFranquia.sTipoLink) {
        this.escolherLink({ value: this.PropsItemFranquia.sTipoLink });
        this.gerarLinkElaborado(); // Passe no formato correto
      }
    } else {
      this.form.reset();
      this.elaborado = false;
      this.inputUnico = false;
    }
  }

  ngOnDestroy(): void {
    // Desinscreve de todos os observáveis para evitar vazamentos de memória
    this.onChangeSubscription.unsubscribe();
  }

  escolherLink(event: any) {
    const selectedValue = event.value; // Valor selecionado

    if (selectedValue === 'U') {
      this.inputUnico = true;
      this.elaborado = false;
      this.form.get('sLink')?.setValue('');
      this.form.get('sTipoLink')?.setValue(selectedValue);
    } else if (selectedValue === 'E') {
      this.elaborado = true;
      this.inputUnico = false;
      this.form.get('sTipoLink')?.setValue(selectedValue);
    } else {
      return;
    }
  }

  gerarLinkElaborado() {
    const user = this.parceiro.getLoggedUser();
    if (user) {
      const link = `${user.sLinkParceiro}/franqueado?=`;
      const nome = this.form.get('sNome')?.value;

      if (link && nome) {
        //

        const nomesSemEspaços = nome.replace(/\s+/g, '');
        const linkFormatado = link + nomesSemEspaços;
        this.form.get('sLinkFranquia')?.setValue(linkFormatado.trim());
      } else {
        // soltar uma ação de form invalid !
      }
    } else {
      console.log('nao localizou o parceiro');
    }
  }

  enviarEventoAlterarSenha() {
    if (this.form.valid) {
      this.formularioEnviado.emit(this.form.value);
      this.preecherForm = false;
      this.visible = false;
    } else {
      this.preecherForm = true;
    }
  }

  salvarDadosForms() {
    if (this.form.valid) {
      let id = this.PropsItemFranquia?.iFranquiaID;
      const formValores = { id, ...this.form.value };

      this.visible = false;

      this.formularioEnviado.emit(formValores);
      //limpando estado do forms
      this.form.reset();
      this.visible = false;
      this.inputUnico = false;
      this.elaborado = false;
      this.preecherForm = false;

      /*  this.submitForm(formValores); */
    } else {
      this.preecherForm = true;
    }
  }

  hideDialog() {
    this.dialog.hide();
    this.form.reset();
    this.inputUnico = false;
    this.elaborado = false;
    this.preecherForm = false;
  }
  copiarlink(link: string) {
    const copiar = {
      link,
      copiarTexto: true,
    };
    this.copiarTexto.emit(copiar);
  }
}
