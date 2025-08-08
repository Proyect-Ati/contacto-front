import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

function phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (!value) return null;
  
  const valid = /^\d{10}$/.test(value);
  return valid ? null : { invalidPhone: true };
}

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.html',
  styleUrls: ['./form-contact.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
    CommonModule
  ]
})
export class FormContact implements OnInit {
  @Input() isEditMode = false;
  @Input() contactId?: number;
  @Output() formSubmit = new EventEmitter<Contact>();

  form: FormGroup;
  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly contactService: ContactService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneValidator]]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.contactId) {
      this.loadContact(this.contactId);
    }
  }

  loadContact(id: number): void {
    this.isLoading = true;
    this.contactService.getContactById(id).subscribe({
      next: (contact) => {
        this.form.patchValue(contact);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading contact', err);
        this.snackBar.open('Error al cargar contacto', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/contacts']);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.markAllAsTouched();
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    this.formSubmit.emit(this.form.value);
  }

  returnList(): void {
    this.router.navigate(['/contacts']);
  }

  private markAllAsTouched(): void {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}