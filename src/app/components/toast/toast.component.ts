import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'toast',
  standalone: true,
  imports: [ToastModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnChanges {
  @Input() toastConfig: {
    severity: string;
    summary: string;
    detail: string;
  } | null = null;

  @Output() eventoExclusao = new EventEmitter<any>();

  visible: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['toastConfig'] && this.toastConfig) {
      this.showToast(this.toastConfig);
    }
    if (this.toastConfig?.severity === 'warn') {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  private showToast(config: {
    severity: string;
    summary: string;
    detail: string;
    life?: number;
  }) {
    this.messageService.add(config);
  }

  emitirEventoExcluir() {
    this.eventoExclusao.emit(true);
    this.visible = false;

    // Alternativamente, se o componente toast usar a biblioteca PrimeNG:
    // Você pode remover mensagens específicas usando o `clear` do MessageService, se necessário
    this.messageService.clear();
  }
}
