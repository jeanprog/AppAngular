import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { ShowModalService } from '../../_core/services/showModal.service';
import { Subscription } from 'rxjs';
import { FranquiaRepositoreService } from '../../_core/services/Franquia.service';
import { Franquia } from '../../_core/entities/Franquia.entity';
import { ToastComponent } from '../../components/toast/toast.component';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { UpdateFranquia } from '../../_core/entities/UpdateFranquia.entity';
import { exportCSV } from '../../utils/export-csv';
import { generatePdf } from '../../utils/export-pdf';
import { ParceiroComponent } from '../parceiro/parceiro.component';
import { ComissaoComponent } from '../comissao/comissao.component';
import { DarkModeService } from '../../_core/services/dark-mode.service';
import { AuthService } from '../../_core/services/auth.service';

@Component({
  selector: 'app-franquia',
  standalone: true,
  imports: [
    ToastComponent,
    CommonModule,
    TableComponent,
    SplitButtonModule,
    DialogComponent,
    MessagesModule,
    DropdownModule,
    ComissaoComponent,
  ],

  templateUrl: './franquia.component.html',
  styleUrls: ['./franquia.component.css'],
})
export class FranquiaComponent implements OnInit {
  constructor(private darkModeService: DarkModeService) {}
  private subscription = new Subscription();
  private parceiro = inject(AuthService);
  @Input() visible: boolean = false;

  @Input() ModalEditar: boolean = false;

  request = inject(FranquiaRepositoreService);
  messages: Message[] = [];
  items: MenuItem[] | undefined;
  franquia?: Franquia;
  showModal = inject(ShowModalService);
  franquias: Franquia[] = [];
  listaAlteraFranquia: Franquia[] = [];
  listaDeletarFranquia: Franquia[] = [];
  tipoDeFiltro?: string;
  deleteTodosFinalizado: boolean = false;
  comissao: boolean = false;

  toastConfig: {
    key?: string;
    severity: string;
    summary: string;
    detail: string;
    life?: number;
  } | null = null;

  ngOnInit(): void {
    this.listarFranquias();

    /* 
    código comentado porque não é mais necessário no dropdown
    this.items = [
      {
        label: 'Cadastrar',
        command: () => {
          this.showDialog();
        },
      },
      {
        label: 'Gerar Csv',
        command: () => {
          this.exportCSV();
        },
      },
      {
        label: 'Gerar PDF',
        command: () => {
          this.gerarPDF();
        },
      },
      {
        label: 'Excluir',
        command: () => {
          this.excluirFranqueados();
        },
      },
    ]; */

    this.observadorModal();
  }

  dialogInputs = [
    { label: 'Nome', type: 'text', name: 'sNome', value: '' },

    { label: 'Email', type: 'text', name: 'sEmail', value: '' },

    { label: 'senha', type: 'password', name: 'sSenha', value: '' },
    // Adicione mais inputs conforme necessário
  ];

  AbrirComissaoEvent(event: any) {
    this.comissao = true;
    if (event) {
      this.franquia = event;
    }
  }
  fecharComissaoEvent() {
    this.comissao = false;
    console.log('acionado evento fechar', this.comissao);
  }

  observadorDarkMode() {
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

  gerarPDF() {
    const listaRenomeada = this.franquias.map((item) => ({
      Franqueado: item.iFranquiaID,
      Parceiro: item.iParceiroID,
      Nuvem: item.iStoreID,
      Nome: item.sNome,
      Email: item.sEmail,
      Link: item.sTipoLink,
      LinkFranquia: item.sLinkFranquia,
      codigoFranquiado: item.iCodFranquiaGerado,
      data: item.dtDataHoraCadastro,
      senha: item.sSenha,
    }));
    generatePdf(listaRenomeada);
  }

  tipoDefiltroBuscado(event: any) {
    console.log(event);
    this.tipoDeFiltro = event.value;
  }

  buscaFranqueados(event: any) {
    if (this.tipoDeFiltro === 'E') {
      const email = event.target.value.trim().toLowerCase();
      if (email === '') {
        this.listarFranquias();
        return;
      }

      if (event.key === 'Enter') {
        this.franquias = this.franquias.filter((franqueado) =>
          franqueado.sEmail.toLowerCase().includes(email)
        );

        console.log(this.franquias, 'lista depois do filtro');
      } else {
        return;
      }
    } else {
      const nome = event.target.value.trim().toLowerCase();
      if (nome === '') {
        this.listarFranquias();
        return;
      }

      if (event.key === 'Enter') {
        this.franquias = this.franquias.filter((franqueado) =>
          franqueado.sNome.toLowerCase().includes(nome)
        );

        console.log(this.franquias, 'lista depois do filtro');
      } else {
        return;
      }
    }
  }

  listarFranquias() {
    this.request.listarTodasFranquias().subscribe((response) => {
      this.franquias = response;
      // Atribui a resposta à propriedade correta
    });
  }

  copiarlink(copiar: { link: string; copiarText: boolean }) {
    navigator.clipboard.writeText(copiar.link).then(() => {
      console.log('copiado com sucesso');
    });
  }

  compartilharAppsExternos(link: string) {
    console.log('cheguei aqui');
    const shareData = {
      title: 'laserhub parceirando',
      text: 'esse é meu link parceiro',
      url: link,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('Compartilhamento bem-sucedido'))
        .catch((error) => console.error('Erro ao compartilhar', error));
    } else {
      alert('A API de Compartilhamento não é suportada neste dispositivo.');
    }
  }

  submitForm(franquia: Franquia) {
    console.log(
      'vendo estado da lista antes de decidir',
      this.listaAlteraFranquia
    );
    if (this.listaAlteraFranquia.length !== 0) {
      console.log('estou alterando');
      this.AlterarFranquia(franquia);
    } else {
      console.log('estou cadastrando');
      this.cadastraFranquia(franquia);
    }
  }

  cadastraFranquia(franquia: Franquia) {
    const user = this.parceiro.getLoggedUser();
    if (user) {
      const novafranquia = new Franquia(
        user.iParceiroID,
        user.iStoreID,
        franquia.sNome,
        franquia.sEmail,
        franquia.sTipoLink,
        franquia.sLinkFranquia,
        1341,
        new Date(),
        franquia.sSenha
      );

      this.request.criarFranquia(novafranquia).subscribe({
        next: (response: Franquia) => {
          console.log(response);
          this.toastConfig = {
            severity: 'success',
            summary: 'Success',
            detail: 'Franquia criada com sucesso!',
          };
          this.listaAlteraFranquia = [];
          this.listarFranquias();
          // Chama listarFranquias após a criação ser bem-sucedida
        },
        error: (error: any) => {
          console.error('Erro ao criar franquia:', error);
        },
      });
    } else {
      console.log('há algum erro com o parceiro associado');
    }
  }

  AlterarFranquia(franquia: any) {
    const updatefranquia = new Franquia(
      this.listaAlteraFranquia[0].iParceiroID,
      this.listaAlteraFranquia[0].iStoreID,
      franquia.sNome,
      franquia.sEmail,
      franquia.sTipoLink,
      franquia.sLinkFranquia,
      this.listaAlteraFranquia[0].iCodFranquiaGerado, //
      franquia.dtDataHoraCadastro ?? new Date(), //
      franquia.sSenha,
      this.listaAlteraFranquia[0].iFranquiaID
    );

    console.log(updatefranquia, 'view franquia ts');
    this.request.alterarFranquia(updatefranquia).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);
          this.toastConfig = {
            severity: 'success',
            summary: 'Success',
            detail: 'Franquia alterada com sucesso!',
          };
          this.listaAlteraFranquia = [];
        } else {
          console.log('Falha na alteração da franquia.');
          this.toastConfig = {
            severity: 'error',
            summary: 'Error',
            detail: 'Falha ao alterar franquia!',
          };
        }

        this.listarFranquias();
      },
      error: (error: any) => {
        console.log('error ao atualizar franquia', error);
        this.toastConfig = {
          severity: 'Error',
          summary: 'Error',
          detail: 'Franquia alterada com sucesso!',
        };
      },
    });
  }

  private observadorModal() {
    this.subscription.add(
      this.showModal.visible$.subscribe((visible) => {
        this.visible = visible;
      })
    );
  }

  editarItem(franquia: Franquia) {
    this.showModal.show();

    // ta adicionando dois na lista por isso está dando merda !
    if (this.listaAlteraFranquia.length > 0) {
      // Substitui o objeto na primeira posição
      this.listaAlteraFranquia[0] = franquia;
    } else {
      // Adiciona o objeto se a lista estiver vazia
      this.listaAlteraFranquia.push(franquia);
    }

    // Atualiza a franquia atual
    this.franquia = this.listaAlteraFranquia[0];

    // Mostra o modal se há apenas um item na lista
    if (this.listaAlteraFranquia.length === 1) {
      this.showModal.show();
    }

    console.log(this.listaAlteraFranquia, 'trocando ou adicionando objeto');
  }

  excluirFranqueados() {
    if (this.listaDeletarFranquia.length === 0) {
      this.messages = [
        {
          severity: 'info',
          detail: 'não é possivel excluir sem selecionar um franquado',
        },
      ];
    } else {
      this.toastConfig = {
        // Use a mesma key configurada no p-toast
        severity: 'warn',
        summary: 'Confirmação',
        detail: 'Tem certeza que deseja excluir o(s) franqueado(s)?',
        life: 9999,
      };
    }
  }

  finalizaDeleteNoBanco(event: boolean) {
    if (event === true) {
      this.listaDeletarFranquia.forEach((franquia) => {
        const { iFranquiaID, iParceiroID } = franquia;

        if (iFranquiaID) {
          this.request.deletarFranquia(iFranquiaID, iParceiroID).subscribe({
            next: (response) => {
              console.log('deletada com sucesso', response);
              this.toastConfig = {
                severity: 'success',
                summary: 'Success',
                detail: 'Franquia deletada com sucesso!',
              };
              this.listarFranquias();
              this.listaDeletarFranquia = [];
              this.deleteTodosFinalizado = true;
            },
            error: (error) => {
              console.log('não foi possivel deletar a franquia', error);
            },
          });
        } else {
          console.log('sem itens selecionados');
        }
      });
    }
  }

  criaListaDeleteItem(item: UpdateFranquia) {
    const { removerLista, ...franquia } = item;

    if (removerLista === true) {
      this.removerItemDaListadeCheck(franquia);
      console.log('removendo', this.listaDeletarFranquia);
    } else {
      const verificarItem = this.listaDeletarFranquia.find(
        (item) => item.iFranquiaID === franquia.iFranquiaID
      );
      if (!verificarItem) {
        this.listaDeletarFranquia.push(franquia);
        console.log('adicionando', this.listaDeletarFranquia);
      } else {
        console.log('item ja esta na lista');
      }
    }
  }

  removerItemDaListadeCheck(franquia: Franquia) {
    this.listaDeletarFranquia = this.listaDeletarFranquia.filter(
      (f) => f.iFranquiaID !== franquia.iFranquiaID
    );
    console.log(this.listaDeletarFranquia);
  }

  exportCSV = (): void => {
    exportCSV(this.franquias, 'Franqueados.csv');
    this.toastConfig = {
      severity: 'success',
      summary: 'Success',
      detail: 'csv gerado com sucesso!',
    };
  };

  showDialog() {
    this.franquia = undefined;
    if (this.franquia === undefined) {
      this.showModal.show();
      this.listaAlteraFranquia = [];
    } else {
      console.log('a lista não está limpa');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
