import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormContact } from '../../component/form-contact/form-contact';
import { Contact } from '../../interfaces/contact.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-edit',
  imports: [FormContact, MatSnackBarModule],
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css',
  standalone: true
})
export class ContactEdit implements OnInit {
  contactId?: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly contactService: ContactService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.params['id']);
  }

  onFormSubmit(contact: Contact): void {
    if (this.contactId) {
      this.contactService.updateContact(this.contactId, contact).subscribe({
        next: () => {
          this.snackBar.open('Contacto actualizado exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/contacts']);
        },
        error: (err) => {
          console.error('Error updating contact', err);
          this.snackBar.open('Error al actualizar contacto', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }
}