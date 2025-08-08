import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { FormContact } from '../../component/form-contact/form-contact';
import { Contact } from '../../interfaces/contact.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-create',
  imports: [FormContact, MatSnackBarModule],
  templateUrl: './contact-create.html',
  styleUrl: './contact-create.css',
})
export class ContactCreate {
  constructor(
    private readonly contactService: ContactService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  onFormSubmit(contact: Contact): void {
    this.contactService.createContact(contact).subscribe({
      next: () => {
        this.snackBar.open('Contacto creado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/contacts']);
      },
      error: (err) => {
        console.error('Error creating contact', err);
        this.snackBar.open('Error al crear contacto', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
