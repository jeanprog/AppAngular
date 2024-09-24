import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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

import { ToastComponent } from '../../components/toast/toast.component';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
@Component({
  selector: 'app-comissao',
  standalone: true,
  imports: [ReactiveFormsModule, ToastComponent, CommonModule],
  templateUrl: './comissao.component.html',
  styleUrls: ['./comissao.component.css'],
})
export class ComissaoComponent {
  @Input() PropsItemFranquia?: Franquia;
  @Output() fechar = new EventEmitter<void>();
  @Output() visible = false;
  comissoesFranqueados: Comissao[] = [];

  private comissaoService = inject(ComissaoRepositoreService);
  private fb = inject(FormBuilder);

  comissaoForm: FormGroup = this.createForm();

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
      console.error('Formulário inválido ou franquia não definida.');
      return;
    }

    const percentual = this.comissaoForm.value.percentual;
    const comissao = this.buildComissao(percentual);
    console.log('verificando saida', comissao);
    this.comissaoService.criarComissao(comissao).subscribe({
      next: () => this.handleSuccess(),
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
  private handleSuccess(): void {
    this.showToast('success', 'Success', 'Comissao criada com sucesso!').then(
      () => this.fechar.emit()
    ); // Só emite após o toast
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
