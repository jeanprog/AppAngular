import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  output,
  SimpleChanges,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Franquia } from '../../_core/entities/Franquia.entity';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, CheckboxModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  @Input() franquias: Franquia[] = [];
  @Input() propsFimDeleteTodos: boolean = false;
  @Output() campartilhamento = new EventEmitter<any>();
  @Output() itemEditar = new EventEmitter<any>();
  @Output() itemExcluir = new EventEmitter<any>();
  selectedFranquias: Set<number> = new Set();

  check: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['franquias'] && changes['franquias'].currentValue) {
      // Confirme se os dados são atualizados corretamente
      this.cd.detectChanges(); // Força o Angular a detectar as mudanças
    }
    if (changes['propsFimDeleteTodos']) {
      // Verifica se propsFimDeleteTodos foi alterado para true
      const currentValue = changes['propsFimDeleteTodos'].currentValue;
      if (currentValue === true) {
        // props vindo do pai para desmarca items apos o submt
        this.check = false;
      }
    }
  }

  selecionarTodos(event: any) {
    console.log(this.check);
    this.check = event.checked;

    if (event.checked) {
      this.franquias.forEach((franquia) => {
        franquia.iFranquiaID;
        // teste funciona só emitir do evento pra gerar a lista
        this.itemExcluir.emit(franquia);

        this.selectedFranquias.add(franquia.iFranquiaID ?? 0);

        console.log(this.selectedFranquias);
      });
      console.log('aqui depois');
    } else {
      this.franquias.forEach((franquia) => {
        const removerItem = { ...franquia, removerLista: true };
        this.itemExcluir.emit(removerItem);
      });
      this.selectedFranquias.clear();
      console.log(this.selectedFranquias);
    }
  }

  compartilharTextoApps(link: string) {
    this.campartilhamento.emit(link);
  }

  eventEmitClickEditar(franquia: Franquia) {
    this.itemEditar.emit(franquia);
  }

  selecionarItemCheck(franquia: Franquia, event: any) {
    if (event.checked) {
      this.selectedFranquias.add(franquia.iFranquiaID ?? 0);
      this.itemExcluir.emit(franquia);
    } else {
      this.selectedFranquias.delete(franquia.iFranquiaID ?? 0);
      console.log(this.selectedFranquias, 'olhando pra saida item unico');
      this.itemExcluir.emit({ ...franquia, removerLista: true });
      console.log(this.check);
    }
  }
}
