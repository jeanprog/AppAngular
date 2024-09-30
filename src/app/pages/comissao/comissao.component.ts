import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Franquia } from '../../_core/entities/Franquia.entity';
import { Comissao } from '../../_core/entities/comissao.entity';
import { ComissaoRepositoreService } from '../../_core/services/Comissao.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { formatDate, formatDateIso } from '../../utils/format-date';

import { ToastComponent } from '../../components/toast/toast.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-comissao',
  standalone: true,
  imports: [
    MessagesModule,
    TableModule,
    ReactiveFormsModule,
    ToastComponent,
    CommonModule,
  ],
  templateUrl: './comissao.component.html',
  styleUrls: ['./comissao.component.css'],
})
export class ComissaoComponent {
  formatDate = formatDate;

  @Input() PropsItemFranquia?: Franquia;
  @Output() fechar = new EventEmitter<void>();
  @Output() visible = false;
  comissoesFranqueados: Comissao[] = [];
  iComissaoID!: number;
  updateComissao!: Comissao;
  messages: Message[] = [];

  private comissaoService = inject(ComissaoRepositoreService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  /*  private location = inject(Location); */

  comissaoForm: FormGroup = this.createForm();
  alterandoComissao: boolean = false;
  novaComissao!: Comissao;
  porcetagemAnterior!: number;

  toastConfig: {
    key?: string;
    severity: string;
    summary: string;
    detail: string;
    life?: number;
  } | null = null;
  ngOnInit() {
    if (!this.PropsItemFranquia) {
      console.error('Nenhuma franquia fornecida.');
    }
    this.listaComissoesFranqueados();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    // Aqui você pode impedir ou controlar o comportamento do botão de voltar
    // Previne a navegação de voltar
    event.preventDefault();

    // Aqui você pode manter o usuário na rota atual ou redirecionar para uma rota desejada
    this.router.navigate([this.router.url]);
    // impede o comportamento padrão
  }

  confirmDeletarComissao(id: number) {
    this.toastConfig = {
      // Use a mesma key configurada no p-toast
      severity: 'warn',
      summary: 'Confirmação',
      detail: 'Tem certeza que deseja excluir a comissão do franqueado?',
      life: 9999,
    };
    this.iComissaoID = id;
  }

  deletarComissaoFranqueado(event: boolean) {
    if (event === true) {
      this.comissaoService.deletarComissao(this.iComissaoID).subscribe({
        next: () => {
          this.handleSuccess('deletar'), this.comissaoForm.reset();
        },
        error: (error) => this.onError(error),
      });
    } else {
      return console.log('voce cancelou ');
    }
  }

  editarComissaoFranqueado(comissao: Comissao) {
    console.log(comissao);
    if (comissao) {
      this.comissaoForm
        .get('percentual')
        ?.setValue(comissao.nPercentualComissao);
      this.alterandoComissao = true;
      this.iComissaoID = comissao.iComissaoID!;
      this.porcetagemAnterior = comissao.nPercentualComissao;
      this.updateComissao = comissao;

      console.log(this.alterandoComissao);
    }
  }

  alteraComissaoFranqueado() {
    const novoPercentual = this.comissaoForm.get('percentual')?.value;
    console.log(this.updateComissao);
    if (novoPercentual === this.porcetagemAnterior) {
      console.log('voce não pode alterar ');
      return;
    }
    const comissao = this.updateComissao;
    const dataModificada = new Date();
    const novaComissao: Comissao = {
      ...comissao,
      nPercentualComissao: novoPercentual,
      dtDataHora: formatDateIso(dataModificada),
    };

    if (!novaComissao) {
    }

    this.comissaoService.alterarComissao(novaComissao).subscribe({
      next: () => {
        this.handleSuccess('alterar'), (this.alterandoComissao = false);
        this.updateComissao;
        this.comissaoForm.reset();
      },
      error: (error) => this.onError(error),
    });
  }

  listaComissoesFranqueados() {
    const iParceiroID = this.PropsItemFranquia!.iParceiroID!;
    const iFranquiaID = this.PropsItemFranquia!.iFranquiaID!;
    if (iParceiroID && iFranquiaID) {
      this.comissaoService
        .listarTodasComissaos(iParceiroID, iFranquiaID)
        .subscribe({
          next: (response) => {
            if (response) {
              this.comissoesFranqueados = response;
              console.log(this.comissoesFranqueados);
              /*    this.cdr.detectChanges(); */
            }
          },
          error: (err) => {
            throw new Error('Método não implementado: ' + err.message);
          },
        });
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      percentual: [null, [Validators.required, Validators.min(0)]],
    });
  }

  cadastrarNovaComissao(): void {
    if (this.comissaoForm.invalid || !this.PropsItemFranquia) {
      this.messages = [
        {
          severity: 'info',
          detail: 'Você não adicionou um percentual',
        },
      ];
      return;
    }

    const percentual = this.comissaoForm.value.percentual;
    const comissao = this.buildComissao(percentual);
    console.log('verificando saida', comissao);
    this.comissaoService.criarComissao(comissao).subscribe({
      next: () => this.handleSuccess('cadastrar'),
      error: (error) => this.onError(error),
    });
  }

  private buildComissao(percentual: number): Comissao {
    return new Comissao(
      this.PropsItemFranquia!.iParceiroID!,
      this.PropsItemFranquia!.iFranquiaID!,
      percentual
    );
  }

  private onError(error: any): void {
    console.error('Erro ao criar comissão:', error);
  }

  private handleSuccess(titulo: string): void {
    if (titulo === 'alterar') {
      // Só emite após o toast
      this.showToast(
        'success',
        'Success',
        'Comissao alterada com sucesso!'
      ).then(() => this.listaComissoesFranqueados());
    } else if (titulo === 'cadastrar') {
      this.showToast('success', 'Success', 'Comissao criada com sucesso!').then(
        () => this.listaComissoesFranqueados()
      );
    } else {
      // Só emite após o toast

      this.showToast(
        'success',
        'Success',
        'Comissao deletada com sucesso!'
      ).then(() => this.listaComissoesFranqueados());
    }
  }

  private showToast(
    severity: string,
    summary: string,
    detail: string
  ): Promise<void> {
    this.toastConfig = { severity, summary, detail };
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000); // Simula o tempo do toast, ajustável conforme necessidade
    });
  }

  fecharComissao(): void {
    this.fechar.emit();
  }
}
