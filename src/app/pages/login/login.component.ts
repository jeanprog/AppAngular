import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../_core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  protected isFormInValid: boolean = false;

  protected form = this.formBuilder.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required],
  });

  ngOnInit(): void {
    const isAuth = this.auth.isLoggedIn();
    if (isAuth) {
      this.router.navigate(['/home']);
    }
  }

  onclick() {
    if (this.form.valid) {
      this.isFormInValid = false;
      this.auth.login();

      this.router.navigate(['/home']);

      console.log('formulário valido', this.form, this.isFormInValid);
    } else {
      console.log('formulário inválido', this.form, this.isFormInValid);
      this.isFormInValid = true;
    }
  }
}
