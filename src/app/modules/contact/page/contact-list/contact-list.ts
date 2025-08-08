import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../../interfaces/contact.interface';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedTable } from '../../../../shared/shared-table/shared-table';

@Component({
  selector: 'app-contact-list',

  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    SharedTable,
  ],
  standalone: true,
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];
  searchTerm = '';
  displayedColumns: { name: string; key: string }[] = [
    { name: 'Nombre', key: 'name' },
    { name: 'Correo', key: 'email' },
    { name: 'Teléfono', key: 'phone' },
    { name: 'Acciones', key: 'actions' },
  ];
  isLoading = false;

  constructor(
    private readonly contactService: ContactService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.isLoading = true;
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading contacts', err);
        this.snackBar.open('Error al cargar contactos', 'Cerrar', {
          duration: 3000,
        });
        this.isLoading = false;
      },
    });
  }

  onDelete(contact: Contact): void {
    const snackBarRef = this.snackBar.open(
      `¿Eliminar a ${contact.name}? Esta acción no se puede deshacer.`,
      'CONFIRMAR',
      {
        duration: 7000,
        panelClass: ['warning-snackbar'],
      }
    );

    snackBarRef.onAction().subscribe(() => {
      this.isLoading = true;
      this.contactService.deleteContact(contact.id!).subscribe({
        next: () => {
          this.contacts = this.contacts.filter((c) => c.id !== contact.id);
          this.snackBar.open(`Contacto ${contact.name} eliminado`, 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.isLoading = false;
        },
        error: (err) => {
          this.snackBar.open(`Error al eliminar a ${contact.name}`, 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
          this.isLoading = false;
        },
      });
    });
  }

  onEdit(contact: Contact): void {
    this.router.navigate(['/contacts/edit', contact.id]);
  }

  onCreate(): void {
    this.router.navigate(['/contacts/create']);
  }
}
