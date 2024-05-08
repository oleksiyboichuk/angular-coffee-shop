import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LocalStorageService } from '../../../components/products/service/localstorage/localstorage.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    number: ['', [Validators.required, Validators.pattern(/^\+?3?8?(0\d{9})$/)]],
  }, {
  })

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  get fullName() { return this.registerForm.controls['fullName'] };
  get email() { return this.registerForm.controls['email'] };
  get number() { return this.registerForm.controls['number'] };

  submitDetails() {
    this.localStorageService.clearCart();
    this.router.navigate(['/products']);
  }
}
