import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../modules/contact/interfaces/contact.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.html',
  styleUrls: ['./shared-table.css'],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  standalone: true,
})
export class SharedTable {
  @Input() dataSource: Contact[] = [];
  @Input() displayedColumns: { name: string; key: string }[] = [];
  @Output() edit = new EventEmitter<Contact>();
  @Output() delete = new EventEmitter<Contact>();

  onEdit(contact: Contact): void {
    this.edit.emit(contact);
  }

  onDelete(contact: Contact): void {
    this.delete.emit(contact);
  }
  get columnKeys(): string[] {
    return this.displayedColumns.map((col) => col.key);
  }
}
